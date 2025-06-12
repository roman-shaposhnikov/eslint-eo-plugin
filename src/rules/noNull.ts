const rule = {
  create: (context) => ({
    Literal(node) {
      if (node.value === null) {
        context.report({
          messageId: "noNull",
          node,
        })
      }
    },
  }),
  meta: {
    docs: {
      description: "Restricts null usage",
    },
    messages: {
      noNull: "Null usage restricted!",
    },
    schema: [],
  },
} satisfies CustomRule

export const noNull = {
  name: "no-null",
  rule,
}
