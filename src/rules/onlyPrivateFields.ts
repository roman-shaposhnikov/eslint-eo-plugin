import { rule } from "./createRule"

const messageId = "onlyPrivateFields"
export const onlyPrivateFields = rule({
  name: "only-private-fields",
  description: "Allows only private fields usage",
  messages: {
    [messageId]: "Only private fields usage allowed!",
  },
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
})

if (import.meta.vitest) {
  const { test } = await import("./test")

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
