import { test } from "./test"
import { noNull } from "./noNull"

const message = noNull.rule.meta.messages.noNull
test(noNull, {
  valid: [],
  invalid: [
    {
      code: "const invalidVariable = null",
      errors: [{ message }],
    },
    {
      code: "{ field: null }",
      errors: [{ message }],
    },
    {
      code: "const func = () => null",
      errors: [{ message }],
    },
    {
      code: "const func = (param = null) => 0",
      errors: [{ message }],
    },
  ],
})
