import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./", // ensure relative paths, e.g. in index.html
  build: {
    outDir: "dist",
    host: "::",
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.md", "**/*.jpg", "**/*.png"],
}));
