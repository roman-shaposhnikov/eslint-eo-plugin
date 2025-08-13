import { test } from "./test"
import { noLet } from "./noLet"

const message = noLet.rule.meta.messages.noLet
test(noLet, {
  valid: ["const invalidVariable = 12313"],
  invalid: [
    {
      code: "let invalidVariable",
      errors: [{ message }],
    },
    {
      code: "let invalidVariable = 12313",
      errors: [{ message }],
    },
    {
      code: "let t1, t2, t3 = 3",
      errors: [{ message }, { message }, { message }],
    },
  ],
})
