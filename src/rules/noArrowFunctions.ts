import { test } from "./test"
import { rule } from "./createRule"

const messageId = "noArrowFunctions"
export const noArrowFunctions = rule({
  name: "no-arrow-functions",
  description: "Restricts arrow functions usage",
  messages: {
    [messageId]: "Arrow functions usage restricted!",
  },
  create: (context) => ({
    ArrowFunctionExpression(node) {
      context.report({ messageId, node })
    },
  }),
})

if (import.meta.vitest) {
  test(noArrowFunctions, {
    invalid: [
      {
        code: `
          () => {}
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          const fn = () => {}
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          [].map(() => {})
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          (async () => {})()
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
