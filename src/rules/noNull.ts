import { test } from "./test"
import { createNamedRule } from "./createRule"

const name = "no-null"
const messageId = "noNull"
export const noNull = createNamedRule(name, {
  create: (context) => ({
    Literal(node) {
      if (node.value === null) {
        context.report({
          messageId,
          node,
        })
      }
    },
  }),
  name,
  meta: {
    docs: {
      description: "Restricts null usage",
    },
    messages: {
      [messageId]: "Null usage restricted!",
    },
    type: "problem",
    schema: [],
  },
  defaultOptions: [],
})

if (import.meta.vitest) {
  test(noNull, {
    valid: [],
    invalid: [
      {
        code: "const invalidVariable = null",
        errors: [{ messageId }],
      },
      {
        code: "{ field: null }",
        errors: [{ messageId }],
      },
      {
        code: "const func = () => null",
        errors: [{ messageId }],
      },
      {
        code: "const func = (param = null) => 0",
        errors: [{ messageId }],
      },
    ],
  })
}
