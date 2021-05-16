import { Request, Response } from "express";

import { ListCategoriesService } from "./ListCategoriesService";

class ListCategoriesController {
  constructor(private listCategoriesRepository: ListCategoriesService) {}
  hande(req: Request, res: Response): Response {
    const categories = this.listCategoriesRepository.execute();
    return res.json(categories);
  }
}

export { ListCategoriesController };
