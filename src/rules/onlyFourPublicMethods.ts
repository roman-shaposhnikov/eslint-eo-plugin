import { rule } from "./createRule"

const messageId = "onlyFourPublicMethods"
export const onlyFourPublicMethods = rule({
  name: "only-four-public-methods",
  description: "Allows only four public methods declaration",
  messages: {
    [messageId]: "Too many public methods! Four is the limit!",
  },
  create: (context) => ({
    ClassBody(node) {
      const methods = node.body.filter((item) => {
        const classMember = item.type === "MethodDefinition"
        const method = classMember && item.kind === "method"
        return method
      })
      if (methods.length > 4) {
        context.report({ messageId, node })
      }
    },
  }),
})

if (import.meta.vitest) {
  const { test } = await import("./test")

  test(onlyFourPublicMethods, {
    valid: [
      `
        class Test {
          m1() {}
        }
      `,
      `
        class Test {
          constructor() {}
          m1() {}
          m2() {}
          m3() {}
          m4() {}
        }
      `,
      `
        const Test = class {
          m1() {}
        }
      `,
      `
        const Test = class {
          constructor() {}
          m1() {}
          m2() {}
          m3() {}
          m4() {}
        }
      `,
    ],
    invalid: [
      {
        code: `
          class Test {
            m1() {}
            m2() {}
            m3() {}
            m4() {}
            m5() {}
          }
        `,
        errors: [{ messageId }],
      },
      {
        code: `
          const Test = class {
            m1() {}
            m2() {}
            m3() {}
            m4() {}
            m5() {}
          }
        `,
        errors: [{ messageId }],
      },
    ],
  })
}
