import { ruleTester } from "./test"
import { noFunctionExpression } from "./noFunctionExpression"

const { name, rule } = noFunctionExpression
ruleTester.run(name, rule, {
  valid: [],
  invalid: [
    {
      code: `
        const test = function nfe() {}
      `,
      errors: [{ message: rule.meta.messages.noFunctionExpression }],
    },
    {
      code: `
        const test = function () {}
      `,
      errors: [{ message: rule.meta.messages.noFunctionExpression }],
    },
    {
      code: `
        (function nfe() {})()
      `,
      errors: [{ message: rule.meta.messages.noFunctionExpression }],
    },
    {
      code: `
        (function () {})()
      `,
      errors: [{ message: rule.meta.messages.noFunctionExpression }],
    },
  ],
})
