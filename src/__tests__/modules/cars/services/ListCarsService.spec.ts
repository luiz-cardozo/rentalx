import { CarsRepositoryMock } from "@modules/cars/repositories/mocks/CarsRepositoryMock";
import { ListAvailableCarsService } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsService";

let listAvailableCarsService: ListAvailableCarsService;
let carsRepositoryMock: CarsRepositoryMock;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    listAvailableCarsService = new ListAvailableCarsService(carsRepositoryMock);
  });

  it("it should be able to list all available cars", async () => {
    const car = await carsRepositoryMock.create({
      name: "Test car",
      description: "Test description",
      daily_rate: 100,
      license_plate: "test-plate",
      fine_amount: 100,
      brand: "Test Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsService.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryMock.create({
      name: "Test car",
      description: "Test description",
      daily_rate: 100,
      license_plate: "test-plate2",
      fine_amount: 100,
      brand: "Test Brand to be found",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsService.execute({
      brand: "Test Brand to be found",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryMock.create({
      name: "Test car name",
      description: "Test description",
      daily_rate: 100,
      license_plate: "test-plate2",
      fine_amount: 100,
      brand: "Test Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsService.execute({
      name: "Test car name",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryMock.create({
      name: "Test car",
      description: "Test description",
      daily_rate: 100,
      license_plate: "test-plate2",
      fine_amount: 100,
      brand: "Test Brand",
      category_id: "categoryToBeFound",
    });

    const cars = await listAvailableCarsService.execute({
      category_id: "categoryToBeFoundW",
    });

    expect(cars).toEqual([car]);
  });
});
