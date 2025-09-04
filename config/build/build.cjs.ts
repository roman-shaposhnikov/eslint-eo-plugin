import { build } from "esbuild"
import { config } from "./esbuild.config"

await build(
  config({
    format: "cjs",
    tsconfig: "tsconfig.cjs.json",
    outdir: "dist/_cjs",
  })
)
