import { config } from "dotenv";

import { AuthEntity } from "../../../../lib-entities/auth/auth.entity";
import { EncryptionUtil } from "../../../../lib-core/utils/encryption.util";
import { generateResetToken } from "../../../../lib-core/utils/token-generator.util";
import { HttpError } from "../../../../lib-core/utils/error.util";
import { IOAuthClientRepository } from "../../domain/repositories/o-auth-client.repository";
import { OAuthClientModel } from "../../../../lib-models/auth/o-auth-client.model";
import { PersonClientFeign } from "../../../../lib-client-feign/users/person.client";
import { PersonEntity } from "../../../../lib-entities/users/person.entity";
import { RedisConfig } from "../../../../config/redis";
import { RoleClientFeign } from "../../../../lib-client-feign/security/role.client";
import { sendPasswordResetEmail } from "../../../../lib-core/utils/mailer.util";
import { tokenManager, oAuth2TokenManager } from '../../dependencies';
import { UserClientFeign } from "../../../../lib-client-feign/users/users.client";

config();

export class AuthManagement {

    private readonly _SECRET: string;
    private readonly _SESION_SG_EXP: number;

    constructor(
        private readonly _encryptedUtils: EncryptionUtil,
        private readonly _redis: RedisConfig,
        private readonly _oAuthClientRepository: IOAuthClientRepository,
        private readonly _personClientFeign: PersonClientFeign,
        private readonly _userClientFeign: UserClientFeign,
        private readonly _roleClientFeign: RoleClientFeign,
    ) {
        this._SECRET = process.env.SECRET_KEY!;
        this._SESION_SG_EXP = Number(process.env.SESION_SG_EXP!);
    }

    async authentication(credentials: AuthEntity): Promise<string | undefined> {
        try {
            const validateCredentials: boolean | undefined = await this._userClientFeign.validateCredential(credentials);
            if (!validateCredentials) throw new HttpError("010002");

            const existingToken = await this._redis.getTokenFromRedis(credentials.nickname);
            if (existingToken) {
                tokenManager.setToken(existingToken);
                return existingToken;
            }

            const person: PersonEntity | undefined = await this._personClientFeign.getPersonByNickname(credentials.nickname);
            if (!person?.user) throw new HttpError("010001");

            const roleId = person.roleId!;
            const role = await this._roleClientFeign.getPersonById(roleId);
            const services = role!.services!.map((service: any) => service.code);

            const token = await tokenManager.generateToken({
                sub: person.user.nickname!,
                id: person.user.id!,
                role: role!.name!,
                services: services,
            }, this._SECRET, Date.now() + this._SESION_SG_EXP * 1000);

            await this._redis.storeTokenInRedis(credentials.nickname, token);

            return token;
        } catch (e) {
            throw e;
        }
    }

    async logout(authHeader: string | undefined, nickname: string): Promise<boolean> {
        try {
            if (!authHeader) throw new HttpError("000003");
            const token = authHeader.split(' ')[1];
            if (!token) throw new HttpError("000003");
            await tokenManager.revokeToken(nickname);
            return true;
        } catch (e) {
            throw e;
        }
    }

    async requestPasswordReset(email: string): Promise<{ message: string | null }> {
        try {
            const user = await this._personClientFeign.getPersonByEmail(email);
            if (!user) throw new HttpError("010001");
            const resetToken = generateResetToken();
            await this._redis.storeResetPassToken(resetToken, user.id!);
            await sendPasswordResetEmail(user.email!, resetToken);
            return { message: "Mail has been sent correctly. Review your inbox." };
        } catch (e) {
            throw e;
        }
    }

    async passwordReset(token: string, newPassword: string): Promise<{ message: string }> {
        try {
            const nickname = await this._redis.getResetPassTokenFromRedis(token);
            if (!nickname) throw new HttpError("000013");

            const person: PersonEntity | undefined = await this._personClientFeign.getPersonByNickname(nickname);
            if (!person) throw new HttpError("000014");

            const hashedPassword = await this._encryptedUtils.encrypt(newPassword);

            person.user!.password = hashedPassword;
            await this._userClientFeign.edit(person.user!.id!, person.user!);
            await this._redis.deleteResetPassToken(token);
            return { message: "The password has been reset successfully." };
        } catch (error) {
            throw error;
        }
    }

    async generateOAuth2Token(clientId: string, clientSecret: string): Promise<string> {
        try {
            const client = await this._oAuthClientRepository.findByClientName(clientId);
            if (!client) throw new HttpError("000020");
            if (this._encryptedUtils.decrypt(client.secret) !== clientSecret) throw new HttpError("000020");
            const payload = { sub: client.name };
            const token = await oAuth2TokenManager.generateToken(payload, this._SECRET, Date.now() + this._SESION_SG_EXP * 1000);
            return token;
        } catch (e) {
            throw e;
        }
    }

    async addMicroservice(credential: { client_id: string, client_secret: string }): Promise<OAuthClientModel | null> {
        try {
            credential.client_secret = this._encryptedUtils.encrypt(credential.client_secret!);
            return await this._oAuthClientRepository.addMicroservice({ name: credential.client_id, secret: credential.client_secret });
        } catch (e) {
            throw e;
        }
    }
}