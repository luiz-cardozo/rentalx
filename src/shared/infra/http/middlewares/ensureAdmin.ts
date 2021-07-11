import { NextFunction, Request, Response } from "express";

import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;
  console.log(id);
  console.log(req.user);
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  console.log(user);

  if (!user.isAdmin) {
    throw new AppError("User don't have permission to perform the action");
  }

  return next();
}
