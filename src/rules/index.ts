import { noLet } from "./noLet"
import { noVar } from "./noVar"
import { noNull } from "./noNull"
import { noStaticMethods } from "./noStaticMethods"
import { onlyPrivateFields } from "./onlyPrivateFields"
import { onlyPublicMethods } from "./onlyPublicMethods"
import { noPropertyAccessors } from "./noPropertyAccessors"
import { noFunctionExpression } from "./noFunctionExpression"
import { noConstOutsideMethod } from "./noConstOutsideMethod"
import { noFunctionDeclaration } from "./noFunctionDeclaration"
import { onlyFourPublicMethods } from "./onlyFourPublicMethods"
import { onlyFourParamsInMethod } from "./onlyFourParamsInMethod"
import { noImplementationInheritance } from "./noImplementationInheritance"

export const enabledRules = [
  noLet,
  noVar,
  noNull,
  noStaticMethods,
  onlyPrivateFields,
  onlyPublicMethods,
  noPropertyAccessors,
  noFunctionExpression,
  noConstOutsideMethod,
  noFunctionDeclaration,
  onlyFourPublicMethods,
  onlyFourParamsInMethod,
  noImplementationInheritance,
]

type ConcreteNamedRule = (typeof enabledRules)[number]
export type ConcreteRule = ConcreteNamedRule["rule"]
export type ConcreteRuleName = ConcreteNamedRule["name"]
