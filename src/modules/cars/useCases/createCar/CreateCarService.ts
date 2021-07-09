import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepositoru } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

// @injectable()
class CreateCarService {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepositoru
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {
    const carAlreadyExistes = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExistes) {
      throw new AppError("Car already exists");
    }
    const car = this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarService };
