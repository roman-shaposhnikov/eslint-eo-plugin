import { noLet } from "./noLet"
import { noVar } from "./noVar"
import { noNull } from "./noNull"
import { noStaticMethods } from "./noStaticMethods"
import { onlyPrivateFields } from "./onlyPrivateFields"
import { noFunctionExpression } from "./noFunctionExpression"
import { noFunctionDeclaration } from "./noFunctionDeclaration"

export const enabledRules = [
  noLet,
  noVar,
  noNull,
  noStaticMethods,
  onlyPrivateFields,
  noFunctionExpression,
  noFunctionDeclaration,
]

type ConcreteNamedRule = (typeof enabledRules)[number]
export type ConcreteRule = ConcreteNamedRule["rule"]
export type ConcreteRuleName = ConcreteNamedRule["name"]
