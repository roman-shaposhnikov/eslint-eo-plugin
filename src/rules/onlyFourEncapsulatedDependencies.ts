import { test } from "./test"
import { rule } from "./createRule"
import { AST_NODE_TYPES } from "@typescript-eslint/utils"

const messageId = "onlyFourEncapsulatedDependencies"
export const onlyFourEncapsulatedDependencies = rule({
  name: "only-four-encapsulated-dependencies",
  description: "Allows only four encapsulated dependencies",
  messages: {
    [messageId]:
      "Too many encapsulated dependencies! Four is the limit!",
  },
  create: (context) => ({
    ClassBody(node) {
      const fields = node.body.filter(
        ({ type }) => type === AST_NODE_TYPES.PropertyDefinition
      )
      if (fields.length > 4) {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  test(onlyFourEncapsulatedDependencies, {
    valid: [
      `
        class Test {
          #field1 = "test"
        }
      `,
      `
        class Test {
          #field1 = "test"
          #field2 = "test"
          #field3 = "test"
          #field4 = "test"
        }
      `,
      `
        class Test {
          private field1 = "test"
        }
      `,
      `
        class Test {
          private field1 = "test"
          private field2 = "test"
          private field3 = "test"
          private field4 = "test"
        }
      `,
    ],
    invalid: [
      {
        code: `
          class Test {
            #field1 = "test"
            #field2 = "test"
            #field3 = "test"
            #field4 = "test"
            #field5 = "test"
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            private field1 = "test"
            private field2 = "test"
            private field3 = "test"
            private field4 = "test"
            private field5 = "test"
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
