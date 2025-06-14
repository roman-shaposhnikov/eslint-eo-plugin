import { noLet } from "./noLet"
import { noNull } from "./noNull"
import { noStaticMethods } from "./noStaticMethods"
import { noFunctionExpression } from "./noFunctionExpression"
import { noFunctionDeclaration } from "./noFunctionDeclaration"

export const enabledRules = [
  noLet,
  noNull,
  noStaticMethods,
  noFunctionExpression,
  noFunctionDeclaration,
]
