interface ICreateUserDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  drivers_license: string;
  avatar?: string;
}

export { ICreateUserDTO };
