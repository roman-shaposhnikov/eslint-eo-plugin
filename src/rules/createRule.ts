import { ESLintUtils } from "@typescript-eslint/utils"
import { RuleWithMetaAndName } from "@typescript-eslint/utils/eslint-utils"

const createRule = ESLintUtils.RuleCreator(() => "")

type Rule<MessageIds extends string> = Readonly<
  RuleWithMetaAndName<[], MessageIds>
>

export const createNamedRule = <
  RuleName extends string,
  MessageIds extends string
>(
  name: RuleName,
  meta: Rule<MessageIds>
): NamedRule<RuleName, MessageIds> => {
  const rule = createRule(meta)
  return { name, rule }
}
