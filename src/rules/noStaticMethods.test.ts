import { test } from "./test"
import { noStaticMethods } from "./noStaticMethods"

test(noStaticMethods, {
  valid: [],
  invalid: [
    {
      code: `
        class Test {
          static method() {}
      }`,
      errors: [{ message: noStaticMethods.rule.meta.messages.noStaticMethods }],
    },
    {
      code: `
        class Test {
          static async method() {}
      }`,
      errors: [{ message: noStaticMethods.rule.meta.messages.noStaticMethods }],
    },
  ],
})
