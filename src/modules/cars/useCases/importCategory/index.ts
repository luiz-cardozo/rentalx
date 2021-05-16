import { CategoriesRepository } from "../../repositories/implementations/CaregoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryService } from "./importCategoryService";

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryService = new ImportCategoryService(categoriesRepository);
const importCategoryController = new ImportCategoryController(
  importCategoryService
);

export { importCategoryController };
