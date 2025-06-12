import { pluginRules, createConfigRules } from "./rulesCollection"

export const plugin = {
  meta: {
    // TODO: replace name and version to values from package.json
    name: "eslint-eo-plugin",
    version: "0.0.0",
  },
  rules: pluginRules,
  configs: {
    recommended: {} satisfies CustomConfig,
  },
} satisfies CustomPlugin

const recommended = {
  plugins: {
    [plugin.meta.name]: plugin,
  },
  rules: createConfigRules(plugin.meta.name),
} satisfies CustomConfig
Object.assign(plugin.configs.recommended, recommended)
