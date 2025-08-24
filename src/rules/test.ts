import { describe, it, afterAll } from "vitest"
import { RuleTester, RunTests } from "@typescript-eslint/rule-tester"

import type { SuiteFactory } from "vitest"

type Message = string | Function

class VitestRuleTester extends RuleTester {
  static override describe(message: Message, callback: SuiteFactory) {
    describe(message, callback)
  }

  static override it(message: Message, callback: SuiteFactory) {
    it(message, callback)
  }

  static override itOnly(message: Message, callback: SuiteFactory) {
    it.only(message, callback)
  }

  static override afterAll(cb: () => void) {
    afterAll(cb)
  }
}

const ruleTester = new VitestRuleTester()

type TestCases<MessageIds extends string> = RunTests<MessageIds, []>

export const test = <Name extends string, MessageIds extends string>(
  { name, rule }: NamedRule<Name, MessageIds>,
  { valid = [], invalid = [] }: Partial<TestCases<MessageIds>>
) => {
  const testCases = { valid, invalid }
  ruleTester.run(name, rule, testCases)
}
