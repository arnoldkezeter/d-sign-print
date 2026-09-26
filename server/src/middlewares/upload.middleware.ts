import multer from "multer";
import { env } from "@/config/env.js";

// Stockage en mémoire : le buffer est ensuite envoyé directement à Cloudinary,
// sans jamais écrire sur le disque du serveur.
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Seuls les fichiers image sont acceptés"));
    }
    cb(null, true);
  },
});
