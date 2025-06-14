import { Suite } from "./Suite"

export class Tests {
  private readonly suites: Suite[] = []
  constructor(paths: string[])
  constructor(suites: Suite[])
  constructor(pathOrSuites: string[] | Suite[]) {
    if (pathOrSuites.length) {
      const item = pathOrSuites[0]
      if (item instanceof Suite) {
        this.suites = pathOrSuites as Suite[]
      } else {
        this.suites = (pathOrSuites as string[]).map(
          (path) => new Suite(path)
        )
      }
    }
  }

  async run() {
    return Promise.all(this.suites.map((suite) => suite.result()))
  }

  async toString(): Promise<string> {
    const results = await this.run()
    const stringifiedResults = results
      .map((result) => result.toString())
      .filter(Boolean)
    return stringifiedResults.join("\n")
  }
}
