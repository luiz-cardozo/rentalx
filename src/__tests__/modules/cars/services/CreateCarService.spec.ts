import { AppError } from "@errors/AppError";
import { CarsRepositoryMock } from "@modules/cars/repositories/mocks/CarsRepositoryMock";
import { CreateCarService } from "@modules/cars/useCases/createCar/CreateCarService";

let createCarService: CreateCarService;
let carsRepository: CarsRepositoryMock;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryMock();
    createCarService = new CreateCarService(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarService.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Car brand",
      category_id: "category",
    });
    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with a license plate already in use", () => {
    expect(async () => {
      await createCarService.execute({
        name: "Car name",
        description: "Car description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "Car brand",
        category_id: "category",
      });

      await createCarService.execute({
        name: "Car name",
        description: "Car description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "Car brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create with default availability set as true", async () => {
    const car = await createCarService.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Car brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
