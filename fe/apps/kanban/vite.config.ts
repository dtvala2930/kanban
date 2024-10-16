import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
/// <reference types='vitest' />
import { defineConfig } from "vite";

export default () => {
  return defineConfig({
    root: __dirname,
    build: {
      outDir: "../../dist/apps/my-app",
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    cacheDir: "../../node_modules/.vite/apps/my-app",
    server: {
      port: 3000,
      host: "localhost",
    },

    preview: {
      port: 4300,
      host: "localhost",
    },

    plugins: [react(), nxViteTsPaths()],
  });
};
