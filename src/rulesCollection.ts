import { enabledRules } from "./rules"

type PluginRules = Record<string, CustomRule>
export const pluginRules = enabledRules.reduce<PluginRules>(
  (acc, rule) => {
    acc[rule.name] = rule.rule
    return acc
  },
  {}
)

export const createConfigRules = (pluginName: string) =>
  enabledRules.reduce<ConfigRules>((acc, rule) => {
    acc[`${pluginName}/${rule.name}`] = "error"
    return acc
  }, {})
