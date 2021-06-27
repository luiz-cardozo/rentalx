import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoryRepositoryMock implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const cateogory = this.categories.find(
      (category) => category.name === name
    );
    return cateogory;
  }
  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });
    this.categories.push(category);
  }
}

export { CategoryRepositoryMock };
