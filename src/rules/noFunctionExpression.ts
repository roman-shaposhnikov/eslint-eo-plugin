import { AST_NODE_TYPES } from "@typescript-eslint/utils"
import { rule } from "./createRule"

const messageId = "noFunctionExpression"
export const noFunctionExpression = rule({
  name: "no-function-expression",
  description: "Restricts FunctionExpression usage",
  messages: {
    [messageId]: "FunctionExpression usage restricted!",
  },
  create: (context) => ({
    FunctionExpression(node) {
      if (node.parent.type !== AST_NODE_TYPES.MethodDefinition) {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  const { test } = await import("./test")

  test(noFunctionExpression, {
    valid: [
      `
      class Test {
        test() {}
      }
      `,
      `
      const Test = class {
        test() {}
      }
      `,
    ],
    invalid: [
      {
        code: `
          const test = function nfe(a: number): number {
            return 42
          }
        `,
        errors: [{ messageId }],
      },
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
