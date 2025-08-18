import { test } from "./test"
import { rule } from "./createRule"

const messageId = "noTypeIntrospection"
export const noTypeIntrospection = rule({
  name: "no-type-introspection",
  description: "Restricts type introspection",
  messages: {
    [messageId]: "Type introspection restricted!",
  },
  create: (context) => ({
    UnaryExpression(node) {
      if (node.operator === "typeof") {
        context.report({ messageId, node })
      }
    },
    BinaryExpression(node) {
      if (node.operator === "instanceof") {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  test(noTypeIntrospection, {
    invalid: [
      {
        code: "typeof any",
        errors: [{ messageId }],
      },
      {
        code: "one instanceof another",
        errors: [{ messageId }],
      },
    ],
  })
}
