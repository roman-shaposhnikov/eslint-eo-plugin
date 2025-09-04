import { rule } from "./createRule"

const messageId = "noStaticBlocks"
export const noStaticBlocks = rule({
  name: "no-static-blocks",
  description: "Restricts static blocks usage",
  messages: {
    [messageId]: "Static blocks usage restricted!",
  },
  create: (context) => ({
    StaticBlock(node) {
      context.report({ messageId, node })
    },
  }),
})

if (import.meta.vitest) {
  const { test } = await import("./test")

  test(noStaticBlocks, {
    invalid: [
      {
        code: `
          class Test {
            static {}
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
