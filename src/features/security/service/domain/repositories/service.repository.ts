import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { ServiceEntity } from "../../../../../lib-entities/security/service.entity";
import { ServiceModel } from "../../../../../lib-models/security/service.model";

export interface ServicesRepository {
    getList(queryParams: QueryParams): Promise<{ rows: ServiceModel[]; count: number; }>;
    get(id: string): Promise<ServiceModel | null>;
    add(service: ServiceEntity): Promise<ServiceModel>;
    edit(id: string, service: ServiceEntity): Promise<ServiceModel>;
    delete(id: string): Promise<ServiceModel>;
}