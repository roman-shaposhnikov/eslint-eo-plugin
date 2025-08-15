import { test } from "./test"
import { createNamedRule } from "./createRule"

const name = "no-function-expression"
const messageId = "noFunctionExpression"
export const noFunctionExpression = createNamedRule(name, {
  create: (context) => ({
    FunctionExpression(node) {
      context.report({
        messageId,
        node,
      })
    },
  }),
  name,
  meta: {
    docs: {
      description: "Restricts FunctionExpression usage",
    },
    messages: {
      [messageId]: "FunctionExpression usage restricted!",
    },
    type: "problem",
    schema: [],
  },
  defaultOptions: [],
})

if (import.meta.vitest) {
  test(noFunctionExpression, {
    valid: [],
    invalid: [
      {
        code: `
          const test = function nfe() {}
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          const test = function () {}
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          (function nfe() {})()
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          (function () {})()
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
