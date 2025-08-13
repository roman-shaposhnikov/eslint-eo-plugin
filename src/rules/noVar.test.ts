import { test } from "./test"
import { noVar } from "./noVar"

const message = noVar.rule.meta.messages.noVar
test(noVar, {
  valid: ["const invalidVariable = 12313"],
  invalid: [
    {
      code: "var invalidVariable",
      errors: [{ message }],
    },
    {
      code: "var invalidVariable = 12313",
      errors: [{ message }],
    },
    {
      code: "var t1, t2, t3 = 3",
      errors: [{ message }, { message }, { message }],
    },
  ],
})
