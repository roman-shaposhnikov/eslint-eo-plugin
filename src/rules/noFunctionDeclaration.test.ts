import { test } from "./test"
import { noFunctionDeclaration } from "./noFunctionDeclaration"

const message = noFunctionDeclaration.rule.meta.messages.noFunctionDeclaration
test(noFunctionDeclaration, {
  valid: [],
  invalid: [
    {
      code: `
        function test() {}
      `,
      errors: [{ message }],
    },
  ],
})
