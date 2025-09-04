import { rule } from "./createRule"

const messageId = "noLet"
export const noLet = rule({
  name: "no-let",
  description: "Restricts Let usage",
  messages: {
    [messageId]: "Let usage restricted, use const instead!",
  },
  create: (context) => ({
    VariableDeclaration(node) {
      if (node.kind === "let") {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  const { test } = await import("./test")

  test(noLet, {
    valid: [
      "const validVariable = 12313",
      `const validVariable: string = "test"`,
    ],
    invalid: [
      {
        code: "let invalidVariable",
        errors: [{ messageId }],
      },
      {
        code: "let invalidVariable: boolean",
        errors: [{ messageId }],
      },
      {
        code: "let invalidVariable: boolean = false",
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
