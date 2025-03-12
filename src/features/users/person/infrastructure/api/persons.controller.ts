import { Request, Response } from "express";

import { ErrorHandlerUtil } from "../../../../../lib-core/utils/error-handler.util";
import { HttpError } from "../../../../../lib-core/utils/error.util";
import { PersonManagement } from "../../application/use-cases/person-management";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";

export class PersonsController {

    constructor(
        private readonly _personManagement: PersonManagement,
        private readonly _handlerError: ErrorHandlerUtil,
    ) { }

    async getList(req: Request, res: Response) {
        try {
            const queryParams: QueryParams = (req as any).queryParams;
            res.status(200).json(await this._personManagement.getList(queryParams));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;
        try {
            res.status(200).json(await this._personManagement.get(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async add(req: Request, res: Response) {
        try {
            const result = await this._personManagement.add(req.body);
            res.status(200).json(result);
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async edit(req: Request, res: Response) {
        const { id } = req.params;
        try {
            res.status(200).json(await this._personManagement.edit(id, req.body));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            res.status(200).json(await this._personManagement.delete(id));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    };

    async getPersonByNickname(req: Request, res: Response) {
        try {
            const { nickname } = req.params;
            res.status(200).json(await this._personManagement.getPersonByNickname(nickname));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async getPersonByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params;
            res.status(200).json(await this._personManagement.getPersonByEmail(email));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }
}
