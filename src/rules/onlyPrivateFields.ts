import { test } from "./test"
import { createNamedRule } from "./createRule"

const name = "only-private-fields"
const messageId = "onlyPrivateFields"
export const onlyPrivateFields = createNamedRule(name, {
  create: (context) => ({
    PropertyDefinition(node) {
      const tsPrivateModifier = node.accessibility === "private"
      const jsPrivateProperty = node.key.type === "PrivateIdentifier"
      const privateField = tsPrivateModifier || jsPrivateProperty
      if (!privateField) {
        context.report({ messageId, node })
      }
    },
  }),
  name,
  meta: {
    docs: {
      description: "Allows only private fields usage",
    },
    messages: {
      [messageId]: "Only private fields usage allowed!",
    },
    type: "problem",
    schema: [],
  },
  defaultOptions: [],
})

if (import.meta.vitest) {
  test(onlyPrivateFields, {
    valid: [
      `
        class Test {
          #field = "test"
        }
      `,
      `
        class Test {
          private field = "test"
        }
      `,
      `
        class Test {
          private field
        }
      `,
      `
        class Test {
          private field: string | number
        }
      `,
    ],
    invalid: [
      {
        code: `
          class Test {
            field = "test"
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            protected field: string
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            protected field = 10
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
