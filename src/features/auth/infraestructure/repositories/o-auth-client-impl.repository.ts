import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../lib-core/utils/error.util";
import { IOAuthClientRepository } from "../../domain/repositories/o-auth-client.repository";
import { OAuthClientModel } from "../../../../lib-models/auth/o-auth-client.model";

export class OAuthClientRepository implements IOAuthClientRepository {

    async findByClientName(clientId: string): Promise<OAuthClientModel | null> {
        try {
            const client = await OAuthClientModel.findOne({
                where: {
                    name: clientId
                },
            });
            return client;
        } catch (error) {
            console.error("Error en OAuthClientRepository:", error);
            throw new HttpError("000000");
        }
    }

    async addMicroservice(credential: { name: string, secret: string }): Promise<OAuthClientModel | null> {
        try {
            return await OAuthClientModel.create(credential as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }
}
