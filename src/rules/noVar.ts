const rule = {
  create: (context) => ({
    VariableDeclarator(node) {
      if (
        node.parent.type === "VariableDeclaration" &&
        node.parent.kind === "var"
      ) {
        context.report({
          messageId: "noVar",
          node: node.parent,
        })
      }
    },
  }),
  meta: {
    docs: {
      description: "Restricts Var usage",
    },
    messages: {
      noVar: "Var usage restricted, use const instead!",
    },
    schema: [],
  },
} satisfies CustomRule

export const noVar = {
  name: "no-var",
  rule,
}
