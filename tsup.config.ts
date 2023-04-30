import { defineConfig } from "tsup";
import config from "@bricked/tsup-config";

export default defineConfig({
  ...config,
  entry: ["src/**/*.ts"],
  tsconfig: "src/tsconfig.json",
});
