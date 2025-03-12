import { ForeignKeyConstraintError, Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../lib-core/utils/error.util";
import { PersonEntity } from "../../../../../lib-entities/users/person.entity";
import { PersonModel } from "../../../../../lib-models/user/person.model";
import { PersonsRepository } from "../../domain/repositories/persons.repository";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { UserModel } from "../../../../../lib-models/user/user.model";

export class PersonsRepositoryImpl implements PersonsRepository {

    async getList(queryParams: QueryParams): Promise<{ rows: PersonModel[]; count: number; }> {
        try {
            return await PersonModel.findAndCountAll({
                where: queryParams.filters,
                order: [["createdAt", "desc"]],
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                limit: queryParams.limit,
                offset: queryParams.offset,
            });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async get(id: string): Promise<PersonModel | null> {
        try {
            const person = await PersonModel.findOne(
                {
                    where: { id },
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                });
            if (!person) {
                throw new HttpError("020001");
            }
            return person;
        } catch (error) {
            throw error;
        }
    }

    async getPersonByNickname(nickname: string): Promise<PersonModel | null> {
        try {
            return await PersonModel.findOne({
                include: [
                    {
                        model: UserModel,
                        as: 'user',
                        where: { nickname },
                        attributes: { exclude: ['password', 'lastAuth', 'origin', 'createdAt', 'updatedAt', 'deletedAt'] }
                    },
                ]
            });
        } catch (error) {
            console.error(error);
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async getPersonByEmail(email: string): Promise<PersonModel | null> {
        try {
            return await PersonModel.findOne(
                {
                    attributes: { exclude: ['password', 'lastAuth', 'origin', 'createdAt', 'updatedAt', 'deletedAt'] },
                    include: [
                        {
                            model: UserModel,
                            as: 'user',
                            where: { email },
                        },
                    ]
                });
        } catch (error) {
            console.error(error);
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async add(person: PersonEntity): Promise<PersonModel> {
        try {
            const userExists = await UserModel.findOne(
                { where: { id: person.userId, deletedAt: null } });
            if (!userExists) throw new HttpError("010001");
            return await PersonModel.create(
                person as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError || error instanceof ForeignKeyConstraintError) {
                throw error;
            }
            throw error;
        }
    }

    async edit(id: string, person: PersonEntity): Promise<PersonModel> {
        try {
            const [affectRows, editedPerson] = await PersonModel.update(
                person as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedPerson[0]) throw new HttpError("020001")
            return editedPerson[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<PersonModel> {
        try {
            const personToDelete = await PersonModel.findOne({
                where: { id: id }
            });
            if (!personToDelete) {
                throw new HttpError("020001");
            }
            await personToDelete.destroy();
            return personToDelete;
        } catch (error) {
            throw error;
        }
    }
}