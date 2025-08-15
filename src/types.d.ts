type CustomRule<MessageIds extends string> =
  import("@typescript-eslint/utils").TSESLint.RuleModule<MessageIds>

type CustomPlugin =
  import("@typescript-eslint/utils").TSESLint.FlatConfig.Plugin

type CustomConfig =
  import("@typescript-eslint/utils").TSESLint.FlatConfig.Config

type ConfigRules = NonNullable<CustomConfig["rules"]>

type NamedRule<RuleName extends string, MessageIds extends string> = {
  name: RuleName
  rule: CustomRule<MessageIds>
}
