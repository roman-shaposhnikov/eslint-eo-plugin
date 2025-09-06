import { rule } from "./createRule"

const messageId = "noStaticMethods"
export const noStaticMethods = rule({
  name: "no-static-methods",
  description: "Restricts static methods usage",
  messages: {
    [messageId]: "Static methods usage restricted!",
  },
  create: (context) => ({
    MethodDefinition(node) {
      if (node.static) {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  const { test } = await import("./test")

  test(noStaticMethods, {
    invalid: [
      {
        code: `
          class Test {
            static method() {}
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            static method(a: number): string {
              return "test"
            }
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            static async method() {}
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
