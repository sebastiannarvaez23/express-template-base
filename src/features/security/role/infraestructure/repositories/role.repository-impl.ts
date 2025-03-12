import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../lib-core/utils/error.util";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { RoleEntity } from "../../../../../lib-entities/security/role.entity";
import { RoleModel } from "../../../../../lib-models/security/role.model";
import { RolesRepository } from "../../domain/repositories/roles.repository";
import { ServiceModel } from "../../../../../lib-models/security/service.model";

export class RolesRepositoryImpl implements RolesRepository {

    async getList(queryParams: QueryParams): Promise<{ rows: RoleModel[]; count: number; }> {
        try {
            return await RoleModel.findAndCountAll({
                where: queryParams.filters,
                order: [["createdAt", "desc"]],
                limit: queryParams.limit,
                offset: queryParams.offset,
                attributes: {
                    exclude: ['updatedAt', 'deletedAt']
                },
            });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async get(id: string): Promise<RoleModel | null> {
        try {
            const role = await RoleModel.findOne(
                {
                    where: { id },
                    attributes: {
                        exclude: ['updatedAt', 'deletedAt']
                    },
                    include: [
                        {
                            model: ServiceModel,
                            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                            through: {
                                attributes: []
                            }
                        }
                    ]
                });
            if (!role) {
                throw new HttpError("030001");
            }
            return role;
        } catch (error) {
            throw error;
        }
    }

    async add(role: RoleEntity): Promise<RoleModel> {
        try {
            return await RoleModel.create(
                role as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, role: RoleEntity): Promise<RoleModel> {
        try {
            const [affectRows, editedPerson] = await RoleModel.update(
                role as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedPerson[0]) throw new HttpError("030001")
            return editedPerson[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<RoleModel> {
        try {
            const roleToDelete = await RoleModel.findOne({
                where: { id: id }
            });
            if (!roleToDelete) {
                throw new HttpError("030001");
            }
            await roleToDelete.destroy();
            return roleToDelete;
        } catch (error) {
            throw error;
        }
    }

    async addServiceAssignment(roleId: string, services: string[]): Promise<RoleModel> {
        try {

            let role = await RoleModel.findOne({
                where: { id: roleId }
            });

            const serviceInstances = await ServiceModel.findAll({
                where: { id: services }
            });

            if (!role) throw new HttpError("030001");
            if (serviceInstances.length !== services.length) throw new HttpError("040002");

            await role.$add('services', serviceInstances);

            role = await RoleModel.findOne({
                where: { id: roleId },
                include: [ServiceModel],
            });
            if (!role) throw new HttpError("030001");

            return role;

        } catch (error) {
            throw error;
        }
    }

    async deleteServiceAssignment(roleId: string, services: string[]): Promise<RoleModel> {
        try {

            let role = await RoleModel.findOne({
                where: { id: roleId }
            });

            const serviceInstances = await ServiceModel.findAll({
                where: { id: services }
            });

            if (!role) throw new HttpError("030001");
            if (serviceInstances.length !== services.length) throw new HttpError("040002");

            await role.$remove('services', serviceInstances);

            role = await RoleModel.findOne({
                where: { id: roleId },
                include: [ServiceModel],
            });
            if (!role) throw new HttpError("030001");

            return role;

        } catch (error) {
            throw error;
        }
    }
}