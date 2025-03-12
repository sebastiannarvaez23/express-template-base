import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isRequired, isString, isEmail, minLength, isDate, maxLength, isNumericString } from "../../../../../lib-core/middlewares/validators/validation.type";
import { PersonEntity } from "../../../../../lib-entities/users/person.entity";

export class PersonEditValidator extends BaseValidator<PersonEntity> {
    constructor() {
        super({
            firstName: [isRequired, isString, minLength(3), maxLength(70)],
            lastName: [isRequired, isString, minLength(3), maxLength(70)],
            email: [isRequired, isString, isEmail, maxLength(100)],
            phone: [isRequired, isString, minLength(10), maxLength(10), isNumericString],
            birthDate: [isRequired, isDate]
        });
    }
}