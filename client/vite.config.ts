import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// "resolve.tsconfigPaths" n'est pas une option Vite valide : la resolution
// des alias "@/..." (definis dans tsconfig.app.json) doit passer par le
// plugin dedie ci-dessous. Sans lui, les imports "@/..." casseront au build
// (et parfois meme en dev selon le cache).
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});