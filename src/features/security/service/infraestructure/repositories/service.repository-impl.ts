import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../lib-core/utils/error.util";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { ServiceEntity } from "../../../../../lib-entities/security/service.entity";
import { ServiceModel } from "../../../../../lib-models/security/service.model";
import { ServicesRepository } from "../../domain/repositories/service.repository";

export class ServicesRepositoryImpl implements ServicesRepository {

    async getList(queryParams: QueryParams): Promise<{ rows: ServiceModel[]; count: number; }> {
        try {
            return await ServiceModel.findAndCountAll({
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

    async get(id: string): Promise<ServiceModel | null> {
        try {
            const service = await ServiceModel.findOne(
                { where: { id } });
            if (!service) {
                throw new HttpError("040001");
            }
            return service;
        } catch (error) {
            throw error;
        }
    }

    async add(service: ServiceEntity): Promise<ServiceModel> {
        try {
            return await ServiceModel.create(
                service as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, service: ServiceEntity): Promise<ServiceModel> {
        try {
            const [affectRows, editedService] = await ServiceModel.update(
                service as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedService[0]) throw new HttpError("040001")
            return editedService[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<ServiceModel> {
        try {
            const serviceToDelete = await ServiceModel.findOne({
                where: { id: id }
            });
            if (!serviceToDelete) {
                throw new HttpError("040001");
            }
            await serviceToDelete.destroy();
            return serviceToDelete;
        } catch (error) {
            throw error;
        }
    }
}