import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../lib-core/utils/error.util";
import { UserEntity } from "../../../../../lib-entities/users/user.entity";
import { UserModel } from "../../../../../lib-models/user/user.model";
import { UsersRepository } from "../../domain/repositories/users.repository";

export class UsersRepositoryImpl implements UsersRepository {

    async getUserPasswordByNickname(nickname: string): Promise<UserModel | null> {
        try {
            return await UserModel.findOne(
                {
                    where: { nickname }
                });
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async getByNickname(nickname: string): Promise<UserModel | null> {
        try {
            return await UserModel.findOne(
                {
                    where: { nickname },
                    attributes: { exclude: ['password'] }
                });
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async add(user: UserEntity): Promise<UserModel> {
        try {
            return await UserModel.create(user as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, user: UserEntity): Promise<UserModel> {
        try {
            const [affectRows, editedUser] = await UserModel.update(
                user as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedUser[0]) throw new HttpError("010001")
            return editedUser[0];
        } catch (error) {
            throw error;
        }
    }
}