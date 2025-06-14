import { noLet } from "./noLet"
import { noVar } from "./noVar"
import { noNull } from "./noNull"
import { noStaticMethods } from "./noStaticMethods"
import { noFunctionExpression } from "./noFunctionExpression"
import { noFunctionDeclaration } from "./noFunctionDeclaration"

export const enabledRules = [
  noLet,
  noVar,
  noNull,
  noStaticMethods,
  noFunctionExpression,
  noFunctionDeclaration,
]
