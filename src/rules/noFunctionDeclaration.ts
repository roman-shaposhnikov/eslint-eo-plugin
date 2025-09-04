import { rule } from "./createRule"

const messageId = "noFunctionDeclaration"
export const noFunctionDeclaration = rule({
  name: "no-function-declaration",
  description: "Restricts FunctionDeclaration usage",
  messages: {
    [messageId]: "FunctionDeclaration usage restricted!",
  },
  create: (context) => ({
    FunctionDeclaration(node) {
      context.report({ messageId, node })
    },
  }),
})

if (import.meta.vitest) {
  const { test } = await import("./test")

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
