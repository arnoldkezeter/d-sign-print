import { v2 as cloudinary } from "cloudinary";
import { env } from "@/config/env.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

/**
 * Upload un buffer (mémoire, via multer) vers Cloudinary et renvoie l'URL sécurisée.
 * Utilisé pour toutes les images du site (portfolio, blog, témoignages, services...).
 */
export function uploadBufferToCloudinary(buffer: Buffer, folder: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `${env.CLOUDINARY_FOLDER}/${folder}` },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Échec de l'upload Cloudinary"));
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

export async function deleteFromCloudinaryByUrl(url: string): Promise<void> {
  try {
    // Extrait le public_id depuis l'URL Cloudinary pour pouvoir le supprimer proprement
    const match = url.match(/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    if (!match) return;
    await cloudinary.uploader.destroy(match[1]);
  } catch {
    // La suppression d'image n'est jamais bloquante pour l'opération métier
  }
}
