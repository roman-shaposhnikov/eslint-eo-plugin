import { noLet } from "./noLet"
import { noVar } from "./noVar"
import { noNull } from "./noNull"
import { noStaticMethods } from "./noStaticMethods"
import { noNewOutsideCtor } from "./noNewOutsideCtor"
import { onlyPrivateFields } from "./onlyPrivateFields"
import { onlyPublicMethods } from "./onlyPublicMethods"
import { noPropertyAccessors } from "./noPropertyAccessors"
import { noFunctionExpression } from "./noFunctionExpression"
import { noConstOutsideMethod } from "./noConstOutsideMethod"
import { noFunctionDeclaration } from "./noFunctionDeclaration"
import { onlyFourPublicMethods } from "./onlyFourPublicMethods"
import { onlyFourParamsInMethod } from "./onlyFourParamsInMethod"
import { noClassWithoutInterface } from "./noClassWithoutInterface"
import { noImplementationInheritance } from "./noImplementationInheritance"
import { onlyFourEncapsulatedDependencies } from "./onlyFourEncapsulatedDependencies"

export const enabledRules = [
  noLet,
  noVar,
  noNull,
  noStaticMethods,
  noNewOutsideCtor,
  onlyPrivateFields,
  onlyPublicMethods,
  noPropertyAccessors,
  noFunctionExpression,
  noConstOutsideMethod,
  noFunctionDeclaration,
  onlyFourPublicMethods,
  onlyFourParamsInMethod,
  noClassWithoutInterface,
  noImplementationInheritance,
  onlyFourEncapsulatedDependencies,
]

type ConcreteNamedRule = (typeof enabledRules)[number]
export type ConcreteRule = ConcreteNamedRule["rule"]
export type ConcreteRuleName = ConcreteNamedRule["name"]
