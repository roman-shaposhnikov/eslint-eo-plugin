import { test } from "./test"
import { createNamedRule } from "./createRule"

const name = "no-function-declaration"
const messageId = "noFunctionDeclaration"
export const noFunctionDeclaration = createNamedRule(name, {
  create: (context) => ({
    FunctionDeclaration(node) {
      context.report({
        messageId,
        node,
      })
    },
  }),
  name,
  meta: {
    docs: {
      description: "Restricts FunctionDeclaration usage",
    },
    messages: {
      [messageId]: "FunctionDeclaration usage restricted!",
    },
    type: "problem",
    schema: [],
  },
  defaultOptions: [],
})

if (import.meta.vitest) {
  test(noFunctionDeclaration, {
    invalid: [
      {
        code: `
          function test() {}
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          function test(): void {}
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          function test(a: string): string {
            return a
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
