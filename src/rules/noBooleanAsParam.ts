import { AST_NODE_TYPES } from "@typescript-eslint/utils"
import { rule } from "./createRule"
import { test } from "./test"

const messageId = "noBooleanAsParam"
export const noBooleanAsParam = rule({
  name: "no-boolean-as-param",
  description: "Restricts boolean as param",
  messages: {
    [messageId]:
      "Boolean as param restricted! Use in place branching instead!",
  },
  create: (context) => ({
    MethodDefinition(node) {
      const params = node.value.params
      params.forEach((param) => {
        const identifier = param.type === AST_NODE_TYPES.Identifier
        if (identifier && param.typeAnnotation) {
          const type = param.typeAnnotation.typeAnnotation.type
          const boolean = type === AST_NODE_TYPES.TSBooleanKeyword
          if (boolean) {
            context.report({ messageId, node })
          }
        }
      })
    },
  }),
})

if (import.meta.vitest) {
  test(noBooleanAsParam, {
    invalid: [
      {
        code: `
          class Test {
            method(a: boolean) {}
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
