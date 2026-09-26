import { z } from "zod";

export const createUserFormSchema = z.object({
  name: z.string().min(2, "Minimum 2 caractères").max(100),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caractères"),
  role: z.enum(["admin", "editor"]),
});

export type CreateUserFormValues = z.infer<typeof createUserFormSchema>;
