import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isRequired, isString, maxLength, isNumericString } from "../../../../../lib-core/middlewares/validators/validation.type";
import { ServiceEntity } from "../../../../../lib-entities/security/service.entity";

export class ServiceEditValidator extends BaseValidator<ServiceEntity> {
    constructor() {
        super({
            name: [isRequired, isString, maxLength(70)],
            code: [isRequired, isNumericString, maxLength(6)]
        });
    }
}