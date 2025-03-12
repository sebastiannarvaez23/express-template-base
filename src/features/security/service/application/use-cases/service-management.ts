import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { ServiceEntity } from "../../../../../lib-entities/security/service.entity";
import { ServiceModel } from "../../../../../lib-models/security/service.model";
import { ServicesRepository } from "../../domain/repositories/service.repository";

export class ServiceManagement {

    constructor(
        private readonly _servicesRepository: ServicesRepository
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: ServiceModel[]; count: number; }> {
        try {
            return await this._servicesRepository.getList(queryParams);
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<ServiceModel | null> {
        try {
            return await this._servicesRepository.get(id);
        } catch (e) {
            throw e;
        }
    }

    async add(service: ServiceEntity): Promise<ServiceEntity | null> {
        try {
            return await this._servicesRepository.add(service);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, service: ServiceEntity): Promise<ServiceEntity | null> {
        try {
            const resultService = await this._servicesRepository.edit(id, service);
            return resultService;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<ServiceModel | null> {
        try {
            const resultService = await this._servicesRepository.delete(id);
            return resultService;
        } catch (e) {
            throw e;
        }
    }
}