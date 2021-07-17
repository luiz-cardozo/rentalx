import { AppError } from "@errors/AppError";
import { CarsRepositoryMock } from "@modules/cars/repositories/mocks/CarsRepositoryMock";
import { SpecificationRepositoryMock } from "@modules/cars/repositories/mocks/SpecificationRepositoryMock";
import { CreateCarSpecificationService } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationService";

let createCarSpecificationService: CreateCarSpecificationService;
let carsRepositoryMock: CarsRepositoryMock;
let specificationsRepositoryMock: SpecificationRepositoryMock;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    specificationsRepositoryMock = new SpecificationRepositoryMock();
    createCarSpecificationService = new CreateCarSpecificationService(
      carsRepositoryMock,
      specificationsRepositoryMock
    );
  });

  it("should not be able to add a specification to a non-existent car", async () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["54321"];

      await createCarSpecificationService.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryMock.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Car brand",
      category_id: "category",
    });

    const specification = await specificationsRepositoryMock.create({
      name: "test",
      description: "test description",
    });
    const specifications_id = [specification.id];

    const specificationCars = await createCarSpecificationService.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
});
