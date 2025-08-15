import { test } from "./test"
import { createNamedRule } from "./createRule"

const name = "no-var"
const messageId = "noVar"
export const noVar = createNamedRule(name, {
  create: (context) => ({
    VariableDeclaration(node) {
      if (node.kind === "var") {
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
      description: "Restricts Var usage",
    },
    messages: {
      [messageId]: "Var usage restricted, use const instead!",
    },
    type: "problem",
    schema: [],
  },
  defaultOptions: [],
})

if (import.meta.vitest) {
  test(noVar, {
    valid: [
      "const invalidVariable = 12313",
      `const validVariable: number = 9`,
    ],
    invalid: [
      {
        code: "var invalidVariable",
        errors: [{ messageId }],
      },
      {
        code: "var invalidVariable: string",
        errors: [{ messageId }],
      },
      {
        code: "var invalidVariable = 12313",
        errors: [{ messageId }],
      },
      {
        code: "var t1, t2, t3 = 3",
        errors: [{ messageId }],
      },
      {
        code: `
          for (var i = 0; i < 10; i++) {
            // some logic
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
