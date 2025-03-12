import { Op } from "sequelize";

import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { PersonListParams } from "../../../../../lib-entities/users/person-qlist.entity";

export function buildPersonListQueryParams(data: PersonListParams): QueryParams {

    const LIST_PAGINATION_LIMIT = Number(process.env.LIST_PAGINATION_LIMIT!);

    const limit = LIST_PAGINATION_LIMIT;
    const page = data.page ? parseInt(data.page, 10) : 1;
    const offset = (page - 1) * limit;

    const filters: { [key: string]: any } = {};

    if (data.firstName) {
        filters.firstName = { [Op.iLike]: `%${data.firstName}%` };
    }

    if (data.lastName) {
        filters.lastName = { [Op.iLike]: `%${data.lastName}%` };
    }

    if (data.email) {
        filters.email = { [Op.iLike]: `%${data.email}%` };
    }

    return { limit, offset, filters };
}