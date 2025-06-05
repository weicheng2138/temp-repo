import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const modulePath = id.split("node_modules/")[1];
            const topLevelFolder = modulePath?.split("/")[0];
            if (topLevelFolder !== ".pnpm") {
              return topLevelFolder;
            }

            // changed . to ?. for the two lines below:
            const scopedPackageName = modulePath?.split("/")[1];
            const chunkName =
              scopedPackageName?.split("@")[
                scopedPackageName.startsWith("@") ? 1 : 0
              ];

            return chunkName;
          }
        },
      },
    },
  },
});
