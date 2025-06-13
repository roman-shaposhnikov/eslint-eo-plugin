import { promisify } from "util"
import { exec } from "child_process"

import { SuiteResult } from "./SuiteResult"

const asyncExec = promisify(exec)
type CreateSuiteResult = (stderr: string) => SuiteResult

export class Suite {
  private readonly path: string
  private readonly createSuiteResult: CreateSuiteResult

  constructor(path: string)
  constructor(path: string, createSuiteResult?: CreateSuiteResult) {
    this.path = path

    if (!createSuiteResult) {
      this.createSuiteResult = (stderr: string) =>
        new SuiteResult(stderr)
    }
  }

  async result(): Promise<SuiteResult> {
    try {
      const { stderr } = await asyncExec(`npx jiti ${this.path}`)
      return this.createSuiteResult(stderr)
    } catch (e) {
      const err = e as Error
      return this.createSuiteResult(err.message)
    }
  }
}
