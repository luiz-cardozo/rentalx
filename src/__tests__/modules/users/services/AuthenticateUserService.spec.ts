import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryMock } from "@modules/accounts/repositories/mocks/UsersRepositoryMock";
import { AuthenticateUserService } from "@modules/accounts/useCases/autheticateUser/AuthenticateUserService";
import { CreateUserService } from "@modules/accounts/useCases/createUser/CreateUserService";

let usersRepositoryMock: UsersRepositoryMock;
let createUserService: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe("Authenticate a user", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    createUserService = new CreateUserService(usersRepositoryMock);
    authenticateUser = new AuthenticateUserService(usersRepositoryMock);
  });

  it("should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      drivers_license: "0123456789",
      name: "User test",
      email: "user@test.com",
      password: "123456",
    };

    await createUserService.execute(user);

    const result = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non-existent user", () => {
    expect(async () => {
      await authenticateUser.execute({
        email: "idontexist@test.com",
        password: "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not authenticate a user with invalid password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        drivers_license: "0123456789",
        name: "User test",
        email: "user@test.com",
        password: "123456",
      };

      await createUserService.execute(user);

      await authenticateUser.execute({
        email: user.email,
        password: "wrongpassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
