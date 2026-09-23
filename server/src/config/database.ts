import mongoose from "mongoose";
import { env } from "@/config/env.js";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("✅ MongoDB connecté");
  } catch (error) {
    console.error("❌ Échec de connexion à MongoDB :", error);
    process.exit(1);
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB déconnecté");
});