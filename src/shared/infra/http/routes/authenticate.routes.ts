import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/autheticateUser/AuthenticateUserController";

const authenticateRoutes = Router();
const autenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", autenticateUserController.handle);

export { authenticateRoutes };
