import { NextFunction, Request, Response } from "express";

import { validationDataMiddleware } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { ServiceAddValidator } from "../../application/validations/service-add.validator";
import { ServiceEditValidator } from "../../application/validations/service-edit.validator";

const serviceAddValidator = new ServiceAddValidator();
const serviceEditValidator = new ServiceEditValidator();

export class ServiceMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(serviceAddValidator)(req, res, next);
    }
    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationDataMiddleware(serviceEditValidator)(req, res, next);
    }

}