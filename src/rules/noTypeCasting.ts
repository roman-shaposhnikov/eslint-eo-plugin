import { test } from "./test"
import { rule } from "./createRule"

const messageId = "noTypeCasting"
export const noTypeCasting = rule({
  name: "no-type-casting",
  description: "Restricts type casting",
  messages: {
    [messageId]: "Type casting restricted!",
  },
  create: (context) => ({
    TSAsExpression(node) {
      context.report({ messageId, node })
    },
  }),
})

if (import.meta.vitest) {
  test(noTypeCasting, {
    invalid: [
      {
        code: `
          one as another
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
