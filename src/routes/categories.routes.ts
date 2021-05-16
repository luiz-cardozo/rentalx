import { Router } from "express";
import { multer } from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRouter = Router();

const upload = multer();

categoriesRouter.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRouter.get("/", (req, res) => {
  return listCategoriesController.hande(req, res);
});

categoriesRouter.post("/import", (req, res) => {});

export { categoriesRouter };
