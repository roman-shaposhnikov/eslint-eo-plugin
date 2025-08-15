import { test } from "./test"
import { createNamedRule } from "./createRule"

const name = "no-let"
const messageId = "noLet"
export const noLet = createNamedRule(name, {
  create: (context) => ({
    VariableDeclaration(node) {
      if (node.kind === "let") {
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
      description: "Restricts Let usage",
    },
    messages: {
      [messageId]: "Let usage restricted, use const instead!",
    },
    type: "problem",
    schema: [],
  },
  defaultOptions: [],
})

if (import.meta.vitest) {
  test(noLet, {
    valid: ["const invalidVariable = 12313"],
    invalid: [
      {
        code: "let invalidVariable",
        errors: [{ messageId }],
      },
      {
        code: "let invalidVariable = 12313",
        errors: [{ messageId }],
      },
      {
        code: "let t1, t2, t3 = 3",
        errors: [{ messageId }],
      },
      {
        code: `
          for (let i = 0; i < 10; i++) {
            // some logic
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
