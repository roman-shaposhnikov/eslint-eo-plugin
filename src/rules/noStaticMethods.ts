import type { TSESTree, TSESLint } from "@typescript-eslint/utils"

import { rule } from "./createRule"
import { CTOR } from "./annotations"

const messageId = "noStaticMethods"
export const noStaticMethods = rule({
  name: "no-static-methods",
  description: "Restricts static methods usage",
  messages: {
    [messageId]: "Static methods usage restricted!",
  },
  create: (context) => ({
    MethodDefinition(node) {
      if (node.static && !isCtor(node, context)) {
        context.report({ messageId, node })
      }
    },
  }),
})

const isCtor = (
  node: TSESTree.MethodDefinition,
  context: TSESLint.RuleContext<"noStaticMethods", []>
) => {
  const comments = context.sourceCode.getCommentsBefore(node)
  const lastComment = comments[comments.length - 1]
  return lastComment && lastComment.value.trim() === CTOR
}

if (import.meta.vitest) {
  const { test } = await import("./test")

  test(noStaticMethods, {
    valid: [
      `
        class Test {
          /* ${CTOR} */
          static method() {}
        }
      `,
    ],
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
