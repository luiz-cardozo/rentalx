import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, drivers_license } = req.body;
    const createUserService = container.resolve(CreateUserService);
    await createUserService.execute({
      name,
      email,
      password,
      drivers_license,
    });

    return res.status(201).send();
  }
}

export { CreateUserController };
