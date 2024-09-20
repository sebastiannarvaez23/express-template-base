import { BaseValidator } from "../../../../api-gateway/middlewares/validators/validation.middleware";
import { isRequired, isString, isEmail, minLength, isDate, maxLength, isNumericString, isUUID } from "../../../../api-gateway/middlewares/validators/validation.type";
import { PersonEntity } from "../../domain/entities/person.entity";

export class PersonAddValidator extends BaseValidator<PersonEntity> {
    constructor() {
        super({
            firstName: [isRequired, isString, minLength(3), maxLength(70)],
            lastName: [isRequired, isString, minLength(3), maxLength(70)],
            email: [isRequired, isString, isEmail, maxLength(100)],
            phone: [isRequired, isString, minLength(10), maxLength(10), isNumericString],
            birthDate: [isRequired, isDate],
            userId: [isRequired, isUUID]
        });
    }
}