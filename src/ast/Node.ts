import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils"

export class Node {
  constructor(private node: TSESTree.Node) {}

  hasAncestor(type: AST_NODE_TYPES): boolean {
    if (!this.node.parent) {
      return false
    }
    if (this.node.parent.type === type) {
      return true
    }
    return new Node(this.node.parent).hasAncestor(type)
  }
}
