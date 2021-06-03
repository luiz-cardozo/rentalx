import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesService } from "./ListCategoriesService";

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesRepository = container.resolve(ListCategoriesService);
    const categories = await listCategoriesRepository.execute();
    return res.json(categories);
  }
}

export { ListCategoriesController };
