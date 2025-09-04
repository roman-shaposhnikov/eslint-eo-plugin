import { rule } from "./createRule"

const messageId = "noImplementationInheritance"
export const noImplementationInheritance = rule({
  name: "no-implementation-inheritance",
  description: "Restricts implementation inheritance",
  messages: {
    [messageId]:
      "Implementation inheritance restricted, use composition instead!",
  },
  create: (context) => ({
    ClassDeclaration(node) {
      if (node.superClass) {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  const { test } = await import("./test")

  test(noImplementationInheritance, {
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
