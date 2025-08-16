import { test } from "./test"
import { rule } from "./createRule"

const messageId = "noNull"
export const noNull = rule({
  name: "no-null",
  description: "Restricts null usage",
  messages: {
    [messageId]: "Null usage restricted!",
  },
  create: (context) => ({
    Literal(node) {
      if (node.value === null) {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  test(noNull, {
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
