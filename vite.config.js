import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 80, // The port inside the container
    host: "0.0.0.0", // Allows external access
  },
});
