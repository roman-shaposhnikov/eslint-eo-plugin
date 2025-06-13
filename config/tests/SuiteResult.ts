import { ErrorMessage } from "./ErrorMessage"

export class SuiteResult {
  private readonly error: ErrorMessage

  constructor(stderr: string)
  constructor(error: ErrorMessage)
  constructor(errorType: string | ErrorMessage) {
    if (typeof errorType === "string") {
      this.error = new ErrorMessage(errorType)
    } else {
      this.error = errorType
    }
  }

  toString(): string {
    return `${this.error.toString()}\n`
  }
}
