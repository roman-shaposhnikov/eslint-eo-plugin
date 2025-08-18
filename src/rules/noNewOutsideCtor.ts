import { test } from "./test"
import { rule } from "./createRule"
import { Node } from "../ast"
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils"

const messageId = "noNewOutsideCtor"
export const noNewOutsideCtor = rule({
  name: "no-new-outside-ctor",
  description:
    "Restricts objects creating usage outside of constructors",
  messages: {
    [messageId]:
      "Objects creating restricted outside of constructors!",
  },
  create: (context) => ({
    NewExpression(node) {
      const [ancestor] = new Node(node).ancestor(
        AST_NODE_TYPES.MethodDefinition
      )
      const method =
        ancestor && (ancestor as TSESTree.MethodDefinition)
      const inCtor = method && method.kind === "constructor"
      if (!inCtor) {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  test(noNewOutsideCtor, {
    valid: [
      `
        class Test {
          constructor() {
            new Test()
          }
        }
      `,
    ],
    invalid: [
      {
        code: `
          new Test()
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
