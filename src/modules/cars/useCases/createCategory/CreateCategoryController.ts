import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryService } from "./CreateCategoryService";

class CreateCategoryController {
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const createCategoryService = container.resolve(CreateCategoryService);

    createCategoryService.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateCategoryController };
