const rule = {
  create: (context) => ({
    FunctionExpression(node) {
      context.report({
        messageId: "noFunctionExpression",
        node,
      })
    },
  }),
  meta: {
    docs: {
      description: "Restricts FunctionExpression usage",
    },
    messages: {
      noFunctionExpression: "FunctionExpression usage restricted!",
    },
    schema: [],
  },
} satisfies CustomRule

export const noFunctionExpression = {
  name: "no-function-expression",
  rule,
}
