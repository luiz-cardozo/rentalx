import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRouter = Router();
const createuserController = new CreateUserController();

usersRouter.post("/", createuserController.handle);

export { usersRouter };
