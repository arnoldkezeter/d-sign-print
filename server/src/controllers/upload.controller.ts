import type { Request, Response, NextFunction } from "express";
import { uploadBufferToCloudinary } from "@/utils/cloudinary.js";
import { BadRequestError } from "@/utils/AppError.js";

/**
 * Endpoint générique d'upload d'image, utilisé par tous les modules admin
 * (portfolio, blog, témoignages...). Le champ `folder` permet de ranger
 * les images dans des dossiers Cloudinary distincts.
 */
export async function uploadImage(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) throw new BadRequestError("Aucun fichier reçu");

    const folder = typeof req.query.folder === "string" ? req.query.folder : "divers";
    const url = await uploadBufferToCloudinary(req.file.buffer, folder);

    res.status(201).json({ success: true, data: { url } });
  } catch (error) {
    next(error);
  }
}
