import bcrypt from "bcryptjs";
import { connectDatabase } from "@/config/database.js";
import { UserModel } from "@/models/User.model.js";
import { Role } from "@/constants/roles.constant.js";
import { env } from "@/config/env.js";

async function seedAdmin() {
  await connectDatabase();

  const existingAdmin = await UserModel.findOne({ role: Role.ADMIN });
  if (existingAdmin) {
    console.log("ℹ️ Un administrateur existe déjà :", existingAdmin.email);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 12);

  const admin = await UserModel.create({
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL,
    password: hashedPassword,
    role: Role.ADMIN,
  });

  console.log("✅ Administrateur créé :", admin.email);
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error("❌ Échec du seed :", error);
  process.exit(1);
});