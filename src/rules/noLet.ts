const rule = {
  create: (context) => ({
    VariableDeclarator(node) {
      if (
        node.parent.type === "VariableDeclaration" &&
        node.parent.kind === "let"
      ) {
        context.report({
          messageId: "noLet",
          node: node.parent,
        })
      }
    },
  }),
  meta: {
    docs: {
      description: "Restricts Let usage",
    },
    messages: {
      noLet: "Let usage restricted, use const instead!",
    },
    schema: [],
  },
} satisfies CustomRule

export const noLet = {
  name: "no-let",
  rule,
}
