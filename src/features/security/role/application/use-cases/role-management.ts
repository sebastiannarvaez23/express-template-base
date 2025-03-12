import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { RoleEntity } from "../../../../../lib-entities/security/role.entity";
import { RoleModel } from "../../../../../lib-models/security/role.model";
import { RolesRepository } from "../../domain/repositories/roles.repository";

export class RoleManagement {

    constructor(
        private readonly _rolesRepository: RolesRepository
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: RoleModel[]; count: number; }> {
        try {
            return await this._rolesRepository.getList(queryParams);
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<RoleModel | null> {
        try {
            return await this._rolesRepository.get(id);
        } catch (e) {
            throw e;
        }
    }

    async add(role: RoleEntity): Promise<RoleEntity | null> {
        try {
            return await this._rolesRepository.add(role);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, role: RoleEntity): Promise<RoleEntity | null> {
        try {
            const resultRole = await this._rolesRepository.edit(id, role);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<RoleModel | null> {
        try {
            const resultRole = await this._rolesRepository.delete(id);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }

    async addServiceAssignment(id: string, services: { services: string[] }): Promise<RoleModel | null> {
        try {
            const resultRole = await this._rolesRepository.addServiceAssignment(id, services.services);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }

    async deleteServiceAssignment(id: string, services: { services: string[] }): Promise<RoleModel | null> {
        try {
            const resultRole = await this._rolesRepository.deleteServiceAssignment(id, services.services);
            return resultRole;
        } catch (e) {
            throw e;
        }
    }
}