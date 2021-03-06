import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationService {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExistis =
      await this.specificationsRepository.findByName(name);
    if (specificationAlreadyExistis) {
      throw new AppError("Specification already exists");
    }
    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationService };
