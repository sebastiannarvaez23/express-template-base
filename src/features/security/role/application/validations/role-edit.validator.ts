import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isRequired, isString, maxLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { RoleEntity } from "../../../../../lib-entities/security/role.entity";

export class RoleEditValidator extends BaseValidator<RoleEntity> {
    constructor() {
        super({
            name: [isRequired, isString, maxLength(70)]
        });
    }
}