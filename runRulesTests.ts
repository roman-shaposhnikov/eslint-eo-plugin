import { globSync } from "fs"
import { exec } from "child_process"

runRulesTests()
async function runRulesTests() {
  const testFiles = globSync("**/rules/**/*.test.ts")
  testFiles.forEach((file) => {
    exec(`jiti ${file}`, (error, stdout, stderr) => {
      if (stdout) {
        console.log(stdout)
      }

      if (error) {
        console.error(error)
      }
    })
  })
}
