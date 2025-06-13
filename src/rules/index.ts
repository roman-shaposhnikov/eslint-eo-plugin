import { noNull } from "./noNull"
import { noStaticMethods } from "./noStaticMethods"
import { noFunctionDeclaration } from "./noFunctionDeclaration"
import { noFunctionExpression } from "./noFunctionExpression"

export const enabledRules = [
  noNull,
  noStaticMethods,
  noFunctionDeclaration,
  noFunctionExpression,
]
