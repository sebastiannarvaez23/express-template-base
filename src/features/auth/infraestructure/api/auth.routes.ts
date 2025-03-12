import express from "express";

import { authController } from "../../dependencies";

const authRoutes = express.Router();

authRoutes.post("/token",
    authController.authentication.bind(authController));

authRoutes.post('/logout',
    authController.logout.bind(authController));

authRoutes.post('/request-password-reset',
    authController.requestPasswordReset.bind(authController));

authRoutes.post('/reset-password/:token',
    authController.passwordReset.bind(authController));

authRoutes.post("/token-oauth",
    authController.generateOAuth2Token.bind(authController));

authRoutes.post("/register-microservice",
    authController.registerMicroservice.bind(authController));

export default authRoutes;