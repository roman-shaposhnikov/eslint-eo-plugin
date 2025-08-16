import { test } from "./test"
import { createNamedRule } from "./createRule"

const name = "only-public-methods"
const messageId = "onlyPublicMethods"
export const onlyPublicMethods = createNamedRule(name, {
  create: (context) => ({
    MethodDefinition(node) {
      const tsPublicModifier = node.accessibility === undefined
      const jsPublicMethod = node.key.type === "Identifier"
      const publicMethod = tsPublicModifier && jsPublicMethod
      if (!publicMethod) {
        context.report({ messageId, node })
      }
    },
  }),
  name,
  meta: {
    docs: {
      description: "Allows only public methods usage",
    },
    messages: {
      [messageId]: "Only public methods usage allowed!",
    },
    type: "problem",
    schema: [],
  },
  defaultOptions: [],
})

if (import.meta.vitest) {
  test(onlyPublicMethods, {
    valid: [
      `
        class Test {
          method() {}
        }
      `,
      `
        class Test {
          method(f: number): number {
            return 42
          }
        }
      `,
    ],
    invalid: [
      {
        code: `
          class Test {
            #method() {}
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            private method() {}
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            protected method() {}
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            public method() {}
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
