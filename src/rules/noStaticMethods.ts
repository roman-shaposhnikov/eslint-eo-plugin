import { test } from "./test"
import { createNamedRule } from "./createRule"

const name = "no-static-methods"
const messageId = "noStaticMethods"
export const noStaticMethods = createNamedRule(name, {
  create: (context) => ({
    MethodDefinition(node) {
      if (node.static) {
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
      description: "Restricts static methods usage",
    },
    messages: {
      [messageId]: "Static methods usage restricted!",
    },
    type: "problem",
    schema: [],
  },
  defaultOptions: [],
})

if (import.meta.vitest) {
  test(noStaticMethods, {
    invalid: [
      {
        code: `
          class Test {
            static method() {}
        }`,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            static method(a: number): string {
              return "test"
            }
        }`,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            static async method() {}
        }`,
        errors: [{ messageId }],
      },
    ],
  })
}
