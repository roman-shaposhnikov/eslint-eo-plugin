import { rule } from "./createRule"

const messageId = "noPropertyAccessors"
export const noPropertyAccessors = rule({
  name: "no-property-accessors",
  description: "Restricts property accessors usage",
  messages: {
    [messageId]: "Property accessors usage restricted!",
  },
  create: (context) => ({
    MethodDefinition(node) {
      const accessor = ["get", "set"].includes(node.kind)
      if (accessor) {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  const { test } = await import("./test")

  test(noPropertyAccessors, {
    invalid: [
      {
        code: `
          class Test {
            get test() {}
            set test() {}
          }
        `,
        errors: [{ messageId }, { messageId }],
      },
      {
        code: `
          class Test {
            get prop1() {}
            set prop2() {}
          }
        `,
        errors: [{ messageId }, { messageId }],
      },
    ],
  })
}
