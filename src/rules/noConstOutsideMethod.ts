import { rule } from "./createRule"
import { AST_NODE_TYPES } from "@typescript-eslint/utils"
import { Node } from "../ast"

const messageId = "noConstOutsideMethod"
export const noConstOutsideMethod = rule({
  name: "no-const-outside-method",
  description: "Restricts const usage outside of methods",
  messages: {
    noConstOutsideMethod:
      "Const usage allowed only inside of methods!",
  },
  create: (context) => {
    return {
      VariableDeclaration(node) {
        const constant = node.kind === "const"
        const [method] = new Node(node).ancestor(
          AST_NODE_TYPES.MethodDefinition
        )
        const inMethod = Boolean(method)
        const shouldReport = constant && !inMethod
        if (shouldReport) {
          context.report({ messageId, node })
        }
      },
    }
  },
})

if (import.meta.vitest) {
  const { test } = await import("./test")

  test(noConstOutsideMethod, {
    valid: [
      `
        class Test {
          constructor() {
            const a = 1
          }
          method() {
            const b = 2
          }
        }
      `,
    ],
    invalid: [
      {
        code: "const a = 1",
        errors: [{ messageId }],
      },
    ],
  })
}
