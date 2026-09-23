import { createApp } from "@/app.js";
import { connectDatabase } from "@/config/database.js";
import { env } from "@/config/env.js";

async function startServer() {
  await connectDatabase();

  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${env.PORT}`);
    console.log(`🌍 Environnement : ${env.NODE_ENV}`);
  });
}

startServer().catch((error) => {
  console.error("❌ Échec du démarrage du serveur :", error);
  process.exit(1);
});