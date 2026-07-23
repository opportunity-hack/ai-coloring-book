import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  // The app keeps JSX in plain .js files (Next.js convention) — teach
  // Vite/esbuild to parse them.
  esbuild: {
    include: /src\/.*\.js$/,
    exclude: [],
    loader: "jsx",
    jsx: "automatic",
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    include: ["src/**/*.test.js"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
