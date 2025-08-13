import { test } from "./test"
import { noLet } from "./noLet"

test(noLet, {
  valid: ["const invalidVariable = 12313"],
  invalid: [
    {
      code: "let invalidVariable",
      errors: [{ message: noLet.rule.meta.messages.noLet }],
    },
    {
      code: "let invalidVariable = 12313",
      errors: [{ message: noLet.rule.meta.messages.noLet }],
    },
    {
      code: "let t1, t2, t3 = 3",
      errors: [
        { message: noLet.rule.meta.messages.noLet },
        { message: noLet.rule.meta.messages.noLet },
        { message: noLet.rule.meta.messages.noLet },
      ],
    },
  ],
})
