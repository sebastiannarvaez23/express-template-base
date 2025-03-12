import express from "express";

import { authMiddleware, authorizationMiddleware, userController, userMiddleware } from "../../../dependencies";

const usersRoutes = express.Router();

usersRoutes.post("/",
    userMiddleware.validateAdd.bind(userMiddleware),
    userController.add.bind(userController));

usersRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0204'),
    userMiddleware.validateEdit.bind(userMiddleware),
    userController.edit.bind(userController));

usersRoutes.post("/validate-credentials",
    userMiddleware.validateCredentialBody.bind(userMiddleware),
    userController.validateCredential.bind(userController));

export default usersRoutes;