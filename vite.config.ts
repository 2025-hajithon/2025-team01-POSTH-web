import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path"; // ⬅️ 추가 필요
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ⬅️ 이 줄 추가!
      "@asset": path.resolve(__dirname, "src/assets"),
    },
  },
  server: {
    host: true,
  },
});
