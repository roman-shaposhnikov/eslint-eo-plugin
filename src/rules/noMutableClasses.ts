import { test } from "./test"
import { rule } from "./createRule"
import { Node } from "../ast"
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils"

const messageId = "noMutableClasses"
export const noMutableClasses = rule({
  name: "no-mutable-classes",
  description: "Restricts class fields reassigning",
  messages: {
    [messageId]: "No reassigning of class fields!",
  },
  create: (context) => ({
    AssignmentExpression(node) {
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
  test(noMutableClasses, {
    valid: [
      `
        class Test {
          field = "test"
        }
      `,
      `
        class Test {
          constructor() {
            this.field = "test"
          }
        }
      `,
      `
        class Test {
          field: string
          constructor(name: string) {
            this.field = name
          }
        }
      `,
      `
        class Test {
          method() {
            const a = 1
          }
        }
      `,
      `
        class Test {
          field = 42
          method() {
            const b = this.field
          }
        }
      `,
    ],
    invalid: [
      {
        code: `
          class Test {
            field = "test"
            method() {
              this.field = "error"
            }
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            field: number
            method() {
              this.field = 42
            }
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
