import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://github.com/RMWebs2023/a-solas/tree/master/client"
  // base: "https://RMWebs2023.github.io/a-solas/",
});
