import tseslint from "typescript-eslint"

import {
  pluginRules,
  tsRules,
  commonRules,
  createConfigRules,
} from "./rulesCollection"

export const plugin = {
  meta: {
    // TODO: replace name and version to values from package.json
    name: "eo",
    version: "0.0.0",
  },
  rules: pluginRules,
  configs: {
    recommended: [] as CustomConfig[],
  },
} satisfies CustomPlugin

const recommended = [
  tseslint.configs.base,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      [plugin.meta.name]: plugin,
    },
    rules: createConfigRules(plugin.meta.name, commonRules),
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    plugins: {
      [plugin.meta.name]: plugin,
    },
    rules: createConfigRules(plugin.meta.name, tsRules),
  },
] satisfies CustomConfig[]
plugin.configs.recommended = recommended
