import { test } from "./test"
import { noVar } from "./noVar"

test(noVar, {
  valid: ["const invalidVariable = 12313"],
  invalid: [
    {
      code: "var invalidVariable",
      errors: [{ message: noVar.rule.meta.messages.noVar }],
    },
    {
      code: "var invalidVariable = 12313",
      errors: [{ message: noVar.rule.meta.messages.noVar }],
    },
    {
      code: "var t1, t2, t3 = 3",
      errors: [
        { message: noVar.rule.meta.messages.noVar },
        { message: noVar.rule.meta.messages.noVar },
        { message: noVar.rule.meta.messages.noVar },
      ],
    },
  ],
})
