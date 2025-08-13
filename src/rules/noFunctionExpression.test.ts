import { test } from "./test"
import { noFunctionExpression } from "./noFunctionExpression"

test(noFunctionExpression, {
  valid: [],
  invalid: [
    {
      code: `
        const test = function nfe() {}
      `,
      errors: [
        { message: noFunctionExpression.rule.meta.messages.noFunctionExpression },
      ],
    },
    {
      code: `
        const test = function () {}
      `,
      errors: [
        { message: noFunctionExpression.rule.meta.messages.noFunctionExpression },
      ],
    },
    {
      code: `
        (function nfe() {})()
      `,
      errors: [
        { message: noFunctionExpression.rule.meta.messages.noFunctionExpression },
      ],
    },
    {
      code: `
        (function () {})()
      `,
      errors: [
        { message: noFunctionExpression.rule.meta.messages.noFunctionExpression },
      ],
    },
  ],
})
