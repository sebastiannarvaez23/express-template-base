import { Request, Response } from "express";

import { AuthManagement } from "../../application/use-cases/auth-management";
import { AuthMiddleware } from "../../../../lib-core/middlewares/auth/authenticate.middleware";
import { ErrorHandlerUtil } from "../../../../lib-core/utils/error-handler.util";
import { HttpError } from "../../../../lib-core/utils/error.util";

export class AuthController {

    constructor(
        private readonly _authManagement: AuthManagement,
        private readonly _authMiddleware: AuthMiddleware,
        private readonly _handlerError: ErrorHandlerUtil,
    ) { }

    async authentication(req: Request, res: Response) {
        await this._authMiddleware.getValidateAuth()(req, res, async () => {
            try {
                const token = await this._authManagement.authentication(req.body);
                res.status(200).json({ token });
            } catch (error) {
                this._handlerError.handle(error as HttpError | Error, req, res);
            }
        });
    }

    async logout(req: Request, res: Response) {
        try {
            const authHeader = req.headers['authorization'];
            const { nickname } = req.body;
            await this._authManagement.logout(authHeader, nickname);
            return res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async requestPasswordReset(req: Request, res: Response) {
        try {
            const { email } = req.body;
            res.status(200).json(await this._authManagement.requestPasswordReset(email));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async passwordReset(req: Request, res: Response) {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;
            res.status(200).json(await this._authManagement.passwordReset(token, newPassword));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async generateOAuth2Token(req: Request, res: Response) {
        try {
            const { client_id, client_secret } = req.body;
            if (!client_id || !client_secret) throw new HttpError("000019");
            const token = await this._authManagement.generateOAuth2Token(client_id, client_secret);
            res.status(200).json({ token });
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async registerMicroservice(req: Request, res: Response) {
        try {
            const result = await this._authManagement.addMicroservice(req.body);
            res.status(200).json(result);
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }
}