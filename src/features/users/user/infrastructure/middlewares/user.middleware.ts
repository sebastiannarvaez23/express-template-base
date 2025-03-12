import { NextFunction, Request, Response } from "express";

import { CredentialBodyValidator } from "../../application/validations/credential-body.validator";
import { UserValidator } from "../../application/validations/user.validator";
import { validationDataMiddleware } from "../../../../../lib-core/middlewares/validators/validation.middleware";

const userValidator = new UserValidator();
const credentialBodyValidator = new CredentialBodyValidator();

export class UserMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(userValidator)(req, res, next);
    }

    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(userValidator)(req, res, next);
    }

    validateCredentialBody(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(credentialBodyValidator)(req, res, next);
    }

}