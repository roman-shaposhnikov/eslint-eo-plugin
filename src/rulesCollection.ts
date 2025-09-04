import { all } from "./rules"
import type {
  ConcreteNamedRule,
  ConcreteRule,
  ConcreteRuleName,
} from "./rules"

export { tsRules, commonRules } from "./rules"

type PluginRules = Record<ConcreteRuleName, ConcreteRule>
export const pluginRules = all.reduce<PluginRules>((acc, rule) => {
  acc[rule.name] = rule.rule
  return acc
}, {} as PluginRules)

export const createConfigRules = (
  pluginName: string,
  rules: ConcreteNamedRule[]
) =>
  rules.reduce<ConfigRules>((acc, rule) => {
    acc[`${pluginName}/${rule.name}`] = "error"
    return acc
  }, {})
