import { config } from "dotenv";

import { EncryptionUtil } from "../../../../../lib-core/utils/encryption.util";
import { UserEntity } from "../../domain/entities/user.entity";
import { UsersRepository } from "../../domain/repositories/users.repository";

config();

export class UserManagement {

    constructor(
        private readonly _userRepository: UsersRepository,
        private readonly _encriptionService: EncryptionUtil,
    ) { }

    async add(user: UserEntity): Promise<UserEntity | null> {
        try {
            user.password = this._encriptionService.encrypt(user.password!);
            return await this._userRepository.add(user);
        } catch (e) {
            throw e;
        }
    }
}