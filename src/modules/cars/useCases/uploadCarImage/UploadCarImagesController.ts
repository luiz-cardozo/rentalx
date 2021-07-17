import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesService } from "./UploadCarImagesService";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as IFiles[];
    const uploadCarImageService = container.resolve(UploadCarImagesService);

    const images_name = images.map((file) => file.filename);

    await uploadCarImageService.execute({
      car_id: id,
      images_name,
    });

    return res.status(201).send();
  }
}

export { UploadCarImagesController };
