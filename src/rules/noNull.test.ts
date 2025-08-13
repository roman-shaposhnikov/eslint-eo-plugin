import { test } from "./test"
import { noNull } from "./noNull"

test(noNull, {
  valid: [],
  invalid: [
    {
      code: "const invalidVariable = null",
      errors: [{ message: noNull.rule.meta.messages.noNull }],
    },
    {
      code: "{ field: null }",
      errors: [{ message: noNull.rule.meta.messages.noNull }],
    },
    {
      code: "const func = () => null",
      errors: [{ message: noNull.rule.meta.messages.noNull }],
    },
    {
      code: "const func = (param = null) => 0",
      errors: [{ message: noNull.rule.meta.messages.noNull }],
    },
  ],
})
