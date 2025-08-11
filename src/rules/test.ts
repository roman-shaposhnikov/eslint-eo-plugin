import { describe, it } from "vitest"
import { RuleTester } from "eslint"

import type { SuiteFactory } from "vitest"

type Message = string | Function

class VitestRuleTester extends RuleTester {
  static describe(message: Message, callback: SuiteFactory) {
    describe(message, callback)
  }

  static it(message: Message, callback: SuiteFactory) {
    it(message, callback)
  }

  static itOnly(message: Message, callback: SuiteFactory) {
    it.only(message, callback)
  }
}

export const ruleTester = new VitestRuleTester()
