import { rule } from "./createRule"

const messageId = "noClassWithoutInterface"
export const noClassWithoutInterface = rule({
  name: "no-class-without-interface",
  description:
    "Restricts class declaration without implementing interface or super class extending",
  messages: {
    [messageId]:
      "Class declaration restricted without implementing interface! Implement or extend super class instead!",
  },
  create: (context) => ({
    ClassDeclaration(node) {
      const noInterfaces = node.implements.length === 0
      const noSuperClass = node.superClass === null
      if (noInterfaces && noSuperClass) {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  const { test } = await import("./test")

  test(noClassWithoutInterface, {
    valid: [
      `
        class Test implements Interface {}
      `,
      `
        class Test extends Super {}
      `,
    ],
    invalid: [
      {
        code: `
          class Test {}
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
