import { api } from "@/lib/axios";

/**
 * Upload une image vers le serveur (qui la transmet à Cloudinary) et renvoie son URL.
 * `folder` range l'image dans un dossier Cloudinary dédié (ex: "portfolio", "blog").
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post(`/uploads/image?folder=${folder}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data.data.url as string;
}
