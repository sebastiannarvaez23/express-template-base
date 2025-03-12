import { NextFunction, Request, Response } from "express";

export class ServiceSerialzerMiddleware {
    add() {
        return (req: Request, res: Response, next: NextFunction) => {
            req.body.createdBy = req.user!.id;
            next();
        };
    }

    edit() {
        return (req: Request, res: Response, next: NextFunction) => {
            req.body.updatedBy = req.user!.id;
            next();
        };
    }
}