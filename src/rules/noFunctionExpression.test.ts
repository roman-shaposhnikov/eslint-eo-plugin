import { test } from "./test"
import { noFunctionExpression } from "./noFunctionExpression"

const message = noFunctionExpression.rule.meta.messages.noFunctionExpression
test(noFunctionExpression, {
  valid: [],
  invalid: [
    {
      code: `
        const test = function nfe() {}
      `,
      errors: [{ message }],
    },
    {
      code: `
        const test = function () {}
      `,
      errors: [{ message }],
    },
    {
      code: `
        (function nfe() {})()
      `,
      errors: [{ message }],
    },
    {
      code: `
        (function () {})()
      `,
      errors: [{ message }],
    },
  ],
})
