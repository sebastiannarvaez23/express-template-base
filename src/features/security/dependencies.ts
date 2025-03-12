import { AuthMiddleware } from "../../lib-core/middlewares/auth/authenticate.middleware";
import { AuthorizationMiddleware } from "../../lib-core/middlewares/auth/authorization.middleware";
import { AuthValidator } from "../../lib-core/middlewares/validators/auth.validator";
import { ErrorHandlerUtil } from "../../lib-core/utils/error-handler.util";
import { QueryParamsMiddleware } from "../../lib-core/middlewares/validators/validation-query-params.middleware";
import { RedisConfig } from "../../config/redis";
import { RoleManagement } from "./role/application/use-cases/role-management";
import { RoleMiddleware } from "./role/infraestructure/middlewares/role.middleware";
import { RolesController } from "./role/infraestructure/api/roles.controller";
import { RoleSerializerMiddleware } from "./role/infraestructure/middlewares/rol-serializer.middleware";
import { RolesRepositoryImpl } from "./role/infraestructure/repositories/role.repository-impl";
import { ServiceManagement } from "./service/application/use-cases/service-management";
import { ServiceMiddleware } from "./service/infraestructure/middlewares/service.middleware";
import { ServicesController } from "./service/infraestructure/api/service.controller";
import { ServiceSerialzerMiddleware } from "./service/infraestructure/middlewares/service-serializer.middleware";
import { ServicesRepositoryImpl } from "./service/infraestructure/repositories/service.repository-impl";
import { TokenManager } from "../../lib-core/utils/token-manager.util";


const handlerError: ErrorHandlerUtil = new ErrorHandlerUtil();
const authValidator: AuthValidator = new AuthValidator();
const redisConfig: RedisConfig = new RedisConfig();

// abstract

const rolesRepository = new RolesRepositoryImpl();
const servicesRepository = new ServicesRepositoryImpl();

const roleManagement = new RoleManagement(rolesRepository);
const serviceManagement = new ServiceManagement(servicesRepository);

// dependencies

export const tokenManager = TokenManager.getInstance(redisConfig);
export const roleSerialzerMiddleware = new RoleSerializerMiddleware();
export const serviceSerialzerMiddleware = new ServiceSerialzerMiddleware();
export const queryParamsMiddleware = new QueryParamsMiddleware();
export const authorizationMiddleware = new AuthorizationMiddleware();
export const authMiddleware = new AuthMiddleware(authValidator, tokenManager);
export const serviceMiddleware = new ServiceMiddleware();
export const serviceController = new ServicesController(serviceManagement, handlerError);
export const roleMiddleware: RoleMiddleware = new RoleMiddleware();
export const roleController: RolesController = new RolesController(roleManagement, handlerError);