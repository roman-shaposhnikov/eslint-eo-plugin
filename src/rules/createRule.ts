import { ESLintUtils } from "@typescript-eslint/utils"
import { RuleWithMetaAndName } from "@typescript-eslint/utils/eslint-utils"

const createRule = ESLintUtils.RuleCreator(() => "")

type Rule<MessageIds extends string> = Readonly<
  RuleWithMetaAndName<[], MessageIds>
>

const createNamedRule = <
  RuleName extends string,
  MessageIds extends string
>(
  name: RuleName,
  meta: Rule<MessageIds>
): NamedRule<RuleName, MessageIds> => {
  const rule = createRule(meta)
  return { name, rule }
}

type CreateRule<MessageIds extends string> =
  Rule<MessageIds>["create"]

type Description<
  RuleName extends string,
  MessageIds extends string
> = {
  name: RuleName
  create: CreateRule<MessageIds>
  messages: Record<MessageIds, string>
  description: string
}

const createNamedRuleWithDefaults = <
  RuleName extends string,
  MessageIds extends string
>({
  name,
  messages,
  description,
  create,
}: Description<RuleName, MessageIds>): NamedRule<
  RuleName,
  MessageIds
> => {
  return createNamedRule(name, {
    create,
    name,
    meta: {
      docs: { description },
      type: "problem",
      schema: [],
      messages,
    },
    defaultOptions: [],
  })
}

export const rule = createNamedRuleWithDefaults
