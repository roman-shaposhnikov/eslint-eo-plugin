import { rule } from "./createRule"

const messageId = "onlyFourParamsInMethod"
export const onlyFourParamsInMethod = rule({
  name: "only-four-params-in-method",
  description: "Allows only four params in method",
  messages: {
    [messageId]: "Too many params in method! Four is the limit!",
  },
  create: (context) => ({
    MethodDefinition(node) {
      const count = node.value.params.length
      if (count > 4) {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  const { test } = await import("./test")

  test(onlyFourParamsInMethod, {
    valid: [
      {
        code: `
          class Test {
            test(a: string, b: number, c: object, d: string) {}
          }
        `,
      },
      {
        code: `
          class Test {
            test(a, b, c, d) {}
          }
        `,
      },
    ],
    invalid: [
      {
        code: `
          class Test {
            test(a: string, b: number, c: object, d: string, e: string) {}
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          class Test {
            test(a, b, c, d, e) {}
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
