import express from "express";

import { buildPersonListQueryParams } from "../middlewares/person-query-params.middleware";
import { personController, authMiddleware, authorizationMiddleware, personMiddleware } from "../../../dependencies";
import { PersonListValidator } from "../../application/validations/person-qlist.validator";
import { queryValidationMiddleware } from "../../../../../lib-core/middlewares/validators/validation-query-params.middleware";

const personsRoutes = express.Router();

personsRoutes.get("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0201'),
    queryValidationMiddleware(new PersonListValidator(), buildPersonListQueryParams),
    personController.getList.bind(personController));

personsRoutes.get("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0202'),
    personController.get.bind(personController));

personsRoutes.post("/",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0203'),
    personMiddleware.validateAdd.bind(personMiddleware),
    personController.add.bind(personController));

personsRoutes.put("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0204'),
    personMiddleware.validateEdit.bind(personMiddleware),
    personController.edit.bind(personController));

personsRoutes.delete("/:id",
    authMiddleware.authenticateToken,
    authorizationMiddleware.checkAccess('0205'),
    personController.delete.bind(personController));

personsRoutes.get("/by-nickname/:nickname",
    personController.getPersonByNickName.bind(personController));

personsRoutes.get("/by-email/:email",
    personController.getPersonByEmail.bind(personController));


export default personsRoutes;