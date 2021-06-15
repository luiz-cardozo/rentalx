import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarService } from "./UpdateUserService";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatar_file = req.file.filename;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    await updateUserAvatarService.execute({ user_id: id, avatar_file });

    return res.status(204).send();
  }
}

export { UpdateUserAvatarController };
