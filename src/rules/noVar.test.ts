import { ruleTester } from "./test"
import { noVar } from "./noVar"

const { name, rule } = noVar
ruleTester.run(name, rule, {
  valid: ["const invalidVariable = 12313"],
  invalid: [
    {
      code: "var invalidVariable",
      errors: [{ message: rule.meta.messages.noVar }],
    },
    {
      code: "var invalidVariable = 12313",
      errors: [{ message: rule.meta.messages.noVar }],
    },
    {
      code: "var t1, t2, t3 = 3",
      errors: [
        { message: rule.meta.messages.noVar },
        { message: rule.meta.messages.noVar },
        { message: rule.meta.messages.noVar },
      ],
    },
  ],
})
