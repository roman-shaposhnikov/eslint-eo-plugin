import { test } from "./test"
import { createNamedRule } from "./createRule"

const name = "no-implementation-inheritance"
const messageId = "noImplementationInheritance"
export const noImplementationInheritance = createNamedRule(name, {
  create: (context) => ({
    ClassDeclaration(node) {
      if (node.superClass) {
        context.report({ messageId, node })
      }
    },
  }),
  name,
  meta: {
    docs: {
      description: "Restricts implementation inheritance",
    },
    messages: {
      [messageId]:
        "Implementation inheritance restricted, use composition instead!",
    },
    type: "problem",
    schema: [],
  },
  defaultOptions: [],
})

if (import.meta.vitest) {
  test(noImplementationInheritance, {
    valid: [],
    invalid: [
      {
        code: `
          class Super {}
          class Child extends Super {}
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          abstract class Super {}
          class Child extends Super {}
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
