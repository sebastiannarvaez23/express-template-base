import { PersonEntity } from "../../../../../lib-entities/users/person.entity";
import { PersonModel } from "../../../../../lib-models/user/person.model";
import { QueryParams } from '../../../../../lib-entities/core/query-params.entity';

export interface PersonsRepository {
    getList(queryParams: QueryParams): Promise<{ rows: PersonModel[]; count: number; }>;
    get(id: string): Promise<PersonModel | null>;
    add(person: PersonEntity): Promise<PersonModel>;
    edit(id: string, person: PersonEntity): Promise<PersonModel>;
    delete(id: string): Promise<PersonModel>;
    getPersonByNickname(nickname: string): Promise<PersonModel | null>;
    getPersonByEmail(email: string): Promise<PersonModel | null>;
}