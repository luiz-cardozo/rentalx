import { AppError } from "../../../../errors/AppError";
import { CategoryRepositoryMock } from "../../../../modules/cars/repositories/mocks/CategoriesRepositoryMock";
import { CreateCategoryService } from "../../../../modules/cars/useCases/createCategory/CreateCategoryService";

let createCategoryService: CreateCategoryService;
let categoriesRepositoryMock: CategoryRepositoryMock;

describe("Create a category", () => {
  beforeEach(() => {
    categoriesRepositoryMock = new CategoryRepositoryMock();
    createCategoryService = new CreateCategoryService(categoriesRepositoryMock);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Description test",
    };

    await createCategoryService.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryMock.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with existing name", async () => {
    expect(async () => {
      const category = {
        name: "Category test",
        description: "Description test",
      };

      await createCategoryService.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryService.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
