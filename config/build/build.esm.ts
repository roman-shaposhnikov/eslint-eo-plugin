import { build } from "esbuild"
import { config } from "./esbuild.config"

await build(
  config({
    format: "esm",
    tsconfig: "tsconfig.esm.json",
    outdir: "dist/_esm",
  })
)
