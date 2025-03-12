import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isEmail, isNumericString, isString, maxLength, minLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { PersonListParams } from "../../../../../lib-entities/users/person-qlist.entity";

export class PersonListValidator extends BaseValidator<PersonListParams> {
    constructor() {
        super({
            page: [isNumericString],
            firstName: [isString, minLength(3), maxLength(70)],
            lastName: [isString, minLength(3), maxLength(70)],
            email: [isEmail],
            limit: [isNumericString],
        });
    }
}