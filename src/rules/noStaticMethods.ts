const rule = {
  create: (context) => ({
    MethodDefinition(node) {
      if (node.static) {
        context.report({
          messageId: "noStaticMethods",
          node,
        })
      }
    },
  }),
  meta: {
    docs: {
      description: "Restricts static methods usage",
    },
    messages: {
      noStaticMethods: "Static methods usage restricted!",
    },
    schema: [],
  },
} satisfies CustomRule

export const noStaticMethods = {
  name: "no-static-methods",
  rule,
}
