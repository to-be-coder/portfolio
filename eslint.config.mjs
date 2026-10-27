import { defineConfig } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Next's React, import, and accessibility plugins still use legacy rule APIs.
// Keep their rules active on supported ESLint 10 until the plugins migrate.
export default defineConfig(fixupConfigRules([
  ...nextCoreWebVitals,
  ...nextTypescript,
]));
