import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils"

export class Node {
  constructor(private node: TSESTree.Node) {}

  ancestor(type: AST_NODE_TYPES): [TSESTree.Node] | [] {
    if (!this.node.parent) {
      return []
    }
    if (this.node.parent.type === type) {
      return [this.node.parent]
    }
    return new Node(this.node.parent).ancestor(type)
  }
}
