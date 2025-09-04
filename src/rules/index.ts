import { noLet } from "./noLet"
import { noVar } from "./noVar"
import { noNull } from "./noNull"
import { noTypeCasting } from "./noTypeCasting"
import { noStaticBlocks } from "./noStaticBlocks"
import { noStaticMethods } from "./noStaticMethods"
import { noNewOutsideCtor } from "./noNewOutsideCtor"
import { noArrowFunctions } from "./noArrowFunctions"
import { noMutableClasses } from "./noMutableClasses"
import { noBooleanAsParam } from "./noBooleanAsParam"
import { onlyPrivateFields } from "./onlyPrivateFields"
import { onlyPublicMethods } from "./onlyPublicMethods"
import { noPropertyAccessors } from "./noPropertyAccessors"
import { noTypeIntrospection } from "./noTypeIntrospection"
import { noFunctionExpression } from "./noFunctionExpression"
import { noConstOutsideMethod } from "./noConstOutsideMethod"
import { noFunctionDeclaration } from "./noFunctionDeclaration"
import { onlyFourPublicMethods } from "./onlyFourPublicMethods"
import { onlyFourParamsInMethod } from "./onlyFourParamsInMethod"
import { noClassWithoutInterface } from "./noClassWithoutInterface"
import { noImplementationInheritance } from "./noImplementationInheritance"
import { onlyFourEncapsulatedDependencies } from "./onlyFourEncapsulatedDependencies"

export const tsRules = [noTypeCasting, noClassWithoutInterface]
export const commonRules = [
  noLet,
  noVar,
  noNull,
  noStaticBlocks,
  noStaticMethods,
  noNewOutsideCtor,
  noArrowFunctions,
  noMutableClasses,
  noBooleanAsParam,
  onlyPrivateFields,
  onlyPublicMethods,
  noPropertyAccessors,
  noTypeIntrospection,
  noFunctionExpression,
  noConstOutsideMethod,
  noFunctionDeclaration,
  onlyFourPublicMethods,
  onlyFourParamsInMethod,
  noImplementationInheritance,
  onlyFourEncapsulatedDependencies,
]
export const all = [...tsRules, ...commonRules]

export type ConcreteNamedRule = (typeof all)[number]
export type ConcreteRule = ConcreteNamedRule["rule"]
export type ConcreteRuleName = ConcreteNamedRule["name"]
