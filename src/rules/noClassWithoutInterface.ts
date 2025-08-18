import { test } from "./test"
import { rule } from "./createRule"

const messageId = "noClassWithoutInterface"
export const noClassWithoutInterface = rule({
  name: "no-class-without-interface",
  description:
    "Restricts class declaration without implementing interface",
  messages: {
    [messageId]:
      "Class declaration restricted without implementing interface!",
  },
  create: (context) => ({
    ClassDeclaration(node) {
      if (node.implements.length === 0) {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  test(noClassWithoutInterface, {
    valid: [
      `
        class Test implements Interface {}
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
