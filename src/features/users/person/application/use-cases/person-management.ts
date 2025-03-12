import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { PersonEntity } from "../../../../../lib-entities/users/person.entity";
import { PersonsRepository } from "../../domain/repositories/persons.repository";
import { PersonModel } from "../../../../../lib-models/user/person.model";

export class PersonManagement {

    constructor(
        private readonly _personsRepository: PersonsRepository
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: PersonModel[]; count: number; }> {
        try {
            return await this._personsRepository.getList(queryParams);
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<PersonModel | null> {
        try {
            return await this._personsRepository.get(id);
        } catch (e) {
            throw e;
        }
    }

    async add(person: PersonEntity): Promise<PersonModel | null> {
        try {
            return await this._personsRepository.add(person);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, person: PersonEntity): Promise<PersonModel | null> {
        try {
            const resultUser = await this._personsRepository.edit(id, person);
            return resultUser;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<PersonModel | null> {
        try {
            const resultUser = await this._personsRepository.delete(id);
            return resultUser;
        } catch (e) {
            throw e;
        }
    }

    async getPersonByNickname(nickname: string): Promise<PersonModel | null> {
        try {
            const resultUser = await this._personsRepository.getPersonByNickname(nickname);
            return resultUser;
        } catch (e) {
            throw e;
        }
    }
    async getPersonByEmail(email: string): Promise<PersonModel | null> {
        try {
            const resultUser = await this._personsRepository.getPersonByEmail(email);
            return resultUser;
        } catch (e) {
            throw e;
        }
    }
}