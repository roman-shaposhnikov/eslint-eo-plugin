import { ruleTester } from "./test"
import { noNull } from "./noNull"

const { name, rule } = noNull
ruleTester.run(name, rule, {
  valid: [],
  invalid: [
    {
      code: "const invalidVariable = null",
      errors: [{ message: rule.meta.messages.noNull }],
    },
    {
      code: "{ field: null }",
      errors: [{ message: rule.meta.messages.noNull }],
    },
    {
      code: "const func = () => null",
      errors: [{ message: rule.meta.messages.noNull }],
    },
    {
      code: "const func = (param = null) => 0",
      errors: [{ message: rule.meta.messages.noNull }],
    },
  ],
})
