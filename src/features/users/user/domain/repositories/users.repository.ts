import { UserEntity } from "../../../../../lib-entities/users/user.entity";
import { UserModel } from "../../../../../lib-models/user/user.model";

export interface UsersRepository {
    getUserPasswordByNickname(nickname: string): Promise<UserModel | null>;
    getByNickname(nickname: string): Promise<UserModel | null>;
    add(user: UserEntity): Promise<UserModel>;
    edit(id: string, user: UserEntity): Promise<UserModel>;
}