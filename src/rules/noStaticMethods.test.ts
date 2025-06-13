import { ruleTester } from "./test"
import { noStaticMethods } from "./noStaticMethods"

const { name, rule } = noStaticMethods
ruleTester.run(name, rule, {
  valid: [],
  invalid: [
    {
      code: `
        class Test {
          static method() {}
      }`,
      errors: [{ message: rule.meta.messages.noStaticMethods }],
    },
    {
      code: `
        class Test {
          static async method() {}
      }`,
      errors: [{ message: rule.meta.messages.noStaticMethods }],
    },
  ],
})
