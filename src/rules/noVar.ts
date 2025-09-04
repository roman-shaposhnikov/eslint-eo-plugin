import { rule } from "./createRule"

const messageId = "noVar"
export const noVar = rule({
  name: "no-var",
  description: "Restricts Var usage",
  messages: {
    [messageId]: "Var usage restricted, use const instead!",
  },
  create: (context) => ({
    VariableDeclaration(node) {
      if (node.kind === "var") {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  const { test } = await import("./test")

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
