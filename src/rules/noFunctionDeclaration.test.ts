import { test } from "./test"
import { noFunctionDeclaration } from "./noFunctionDeclaration"

test(noFunctionDeclaration, {
  valid: [],
  invalid: [
    {
      code: `
        function test() {}
      `,
      errors: [
        { message: noFunctionDeclaration.rule.meta.messages.noFunctionDeclaration },
      ],
    },
  ],
})
