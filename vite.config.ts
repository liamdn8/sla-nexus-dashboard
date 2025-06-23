

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {
      REACT_APP_AWS_ACCESS_KEY_ID: JSON.stringify(process.env.REACT_APP_AWS_ACCESS_KEY_ID || ''),
      REACT_APP_AWS_SECRET_ACCESS_KEY: JSON.stringify(process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || ''),
    },
  },
}));

