import { AuthController } from "./infraestructure/api/auth.controller";
import { AuthManagement } from "./application/use-cases/auth-management";
import { AuthMiddleware } from "../../lib-core/middlewares/auth/authenticate.middleware";
import { AuthorizationMiddleware } from "../../lib-core/middlewares/auth/authorization.middleware";
import { AuthValidator } from "../../lib-core/middlewares/validators/auth.validator";
import { EncryptionUtil } from "../../lib-core/utils/encryption.util";
import { ErrorHandlerUtil } from "../../lib-core/utils/error-handler.util";
import { OAuth2TokenManager } from "../../lib-core/utils/o-auth2-token-manager.util";
import { OAuthClientRepository } from './infraestructure/repositories/o-auth-client-impl.repository';
import { PersonClientFeign } from "../../lib-client-feign/users/person.client";
import { RedisConfig } from "../../config/redis";
import { RoleClientFeign } from "../../lib-client-feign/security/role.client";
import { TokenManager } from "../../lib-core/utils/token-manager.util";
import { UserClientFeign } from "../../lib-client-feign/users/users.client";


const authValidator: AuthValidator = new AuthValidator();
const handlerError: ErrorHandlerUtil = new ErrorHandlerUtil();
const redisConfig: RedisConfig = new RedisConfig();
const encryptedService: EncryptionUtil = new EncryptionUtil();
const personClientFeign: PersonClientFeign = new PersonClientFeign();
const userClientFeign: UserClientFeign = new UserClientFeign();
const roleClientFeign: RoleClientFeign = new RoleClientFeign();
const oAuthClientRepository: OAuthClientRepository = new OAuthClientRepository();

// abstract

const authManagement = new AuthManagement(encryptedService, redisConfig, oAuthClientRepository, personClientFeign, userClientFeign, roleClientFeign);

// dependencies

export const tokenManager = TokenManager.getInstance(redisConfig);
export const oAuth2TokenManager = OAuth2TokenManager.getInstance(redisConfig);
export const authorizationMiddleware = new AuthorizationMiddleware();
export const authMiddleware = new AuthMiddleware(authValidator, tokenManager);
export const authController = new AuthController(authManagement, authMiddleware, handlerError);