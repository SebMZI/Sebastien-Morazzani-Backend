import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

const { jest } = globals;

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, jest },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.node, ...globals.jest } },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
]);
