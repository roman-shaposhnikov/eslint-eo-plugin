const rule = {
  create: (context) => ({
    FunctionDeclaration(node) {
      context.report({
        messageId: "noFunctionDeclaration",
        node,
      })
    },
  }),
  meta: {
    docs: {
      description: "Restricts FunctionDeclaration usage",
    },
    messages: {
      noFunctionDeclaration: "FunctionDeclaration usage restricted!",
    },
    schema: [],
  },
} satisfies CustomRule

export const noFunctionDeclaration = {
  name: "no-function-declaration",
  rule,
}
