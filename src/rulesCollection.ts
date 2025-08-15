import { enabledRules } from "./rules"
import type { ConcreteRule, ConcreteRuleName } from "./rules"

type PluginRules = Record<ConcreteRuleName, ConcreteRule>
export const pluginRules = enabledRules.reduce<PluginRules>(
  (acc, rule) => {
    acc[rule.name] = rule.rule
    return acc
  },
  {} as PluginRules
)

export const createConfigRules = (pluginName: string) =>
  enabledRules.reduce<ConfigRules>((acc, rule) => {
    acc[`${pluginName}/${rule.name}`] = "error"
    return acc
  }, {})
