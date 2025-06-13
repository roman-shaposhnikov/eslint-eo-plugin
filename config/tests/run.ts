import { globSync } from "fs"
import { Tests } from "./Tests"

const paths = globSync("**/rules/**/*.test.ts")
const tests = new Tests(paths)
const result = await tests.toString()
console.info(result)
