import { AuthMiddleware } from "../../lib-core/middlewares/auth/authenticate.middleware";
import { AuthorizationMiddleware } from "../../lib-core/middlewares/auth/authorization.middleware";
import { AuthValidator } from "../../lib-core/middlewares/validators/auth.validator";
import { EncryptionUtil } from "../../lib-core/utils/encryption.util";
import { ErrorHandlerUtil } from "../../lib-core/utils/error-handler.util";
import { PersonManagement } from "./person/application/use-cases/person-management";
import { PersonMiddleware } from "./person/infrastructure/middlewares/person.middleware";
import { PersonsController } from "./person/infrastructure/api/persons.controller";
import { PersonSerialzerMiddleware } from "./person/infrastructure/middlewares/person-serializer.middleware";
import { PersonsRepositoryImpl } from "./person/infrastructure/repositories/persons.repository-impl";
import { QueryParamsMiddleware } from "../../lib-core/middlewares/validators/validation-query-params.middleware";
import { RedisConfig } from "../../config/redis";
import { TokenManager } from "../../lib-core/utils/token-manager.util";
import { UserManagement } from "./user/application/use-cases/user-management";
import { UserMiddleware } from "./user/infrastructure/middlewares/user.middleware";
import { UsersController } from "./user/infrastructure/api/users.controller";
import { UsersRepositoryImpl } from "./user/infrastructure/repositories/users.repository-impl";


const encryptionService: EncryptionUtil = new EncryptionUtil();
const handlerError: ErrorHandlerUtil = new ErrorHandlerUtil();
const authValidator: AuthValidator = new AuthValidator();
const redisConfig: RedisConfig = new RedisConfig();

// abstract

const personsRepository = new PersonsRepositoryImpl();
const usersRepository = new UsersRepositoryImpl();

const personManagement = new PersonManagement(personsRepository);
const userManagement = new UserManagement(usersRepository, encryptionService);

// dependencies
export const tokenManager = TokenManager.getInstance(redisConfig);
export const authorizationMiddleware = new AuthorizationMiddleware();
export const authMiddleware = new AuthMiddleware(authValidator, tokenManager);
export const queryParamsMiddleware = new QueryParamsMiddleware();
export const personMiddleware = new PersonMiddleware();
export const personSerialzerMiddleware = new PersonSerialzerMiddleware();
export const userMiddleware = new UserMiddleware();
export const personController = new PersonsController(personManagement, handlerError);
export const userController = new UsersController(userManagement, handlerError);