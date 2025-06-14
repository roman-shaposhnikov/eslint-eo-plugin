import { ruleTester } from "./test"
import { noLet } from "./noLet"

const { name, rule } = noLet
ruleTester.run(name, rule, {
  valid: ["const invalidVariable = 12313"],
  invalid: [
    {
      code: "let invalidVariable",
      errors: [{ message: rule.meta.messages.noLet }],
    },
    {
      code: "let invalidVariable = 12313",
      errors: [{ message: rule.meta.messages.noLet }],
    },
    {
      code: "let t1, t2, t3 = 3",
      errors: [
        { message: rule.meta.messages.noLet },
        { message: rule.meta.messages.noLet },
        { message: rule.meta.messages.noLet },
      ],
    },
  ],
})
