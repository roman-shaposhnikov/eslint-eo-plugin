import { ruleTester } from "./test"
import { noFunctionDeclaration } from "./noFunctionDeclaration"

const { name, rule } = noFunctionDeclaration
ruleTester.run(name, rule, {
  valid: [],
  invalid: [
    {
      code: `
        function test() {}
      `,
      errors: [{ message: rule.meta.messages.noFunctionDeclaration }],
    },
  ],
})
