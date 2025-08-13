import { test } from "./test"
import { noStaticMethods } from "./noStaticMethods"

const message = noStaticMethods.rule.meta.messages.noStaticMethods
test(noStaticMethods, {
  valid: [],
  invalid: [
    {
      code: `
        class Test {
          static method() {}
      }`,
      errors: [{ message }],
    },
    {
      code: `
        class Test {
          static async method() {}
      }`,
      errors: [{ message }],
    },
  ],
})
