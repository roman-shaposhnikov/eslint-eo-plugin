type CustomRule = import("eslint").JSRuleDefinition
type CustomPlugin =
  import("@typescript-eslint/utils").TSESLint.FlatConfig.Plugin
type CustomConfig =
  import("@typescript-eslint/utils").TSESLint.FlatConfig.Config
type ConfigRules = NonNullable<CustomConfig["rules"]>
type NamedRule = { name: string; rule: CustomRule }
