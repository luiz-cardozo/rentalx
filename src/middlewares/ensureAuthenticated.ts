import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  user_id: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error("Missing token");
  }

  const [, token] = authHeader.split(" ");
  try {
    const { user_id } = verify(
      token,
      "e061d774e85def2c1664cadc1a2410a7"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new Error("User doesn't exists");
    }

    next();
  } catch (err) {
    throw new Error("Invalid token");
  }
}
