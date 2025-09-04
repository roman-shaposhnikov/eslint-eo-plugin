import type { BuildOptions } from "esbuild"

export const config = (options: Partial<BuildOptions>) =>
  ({
    entryPoints: ["src/**/*.ts"],
    bundle: false,
    treeShaking: true,
    platform: "node",
    define: {
      "import.meta.vitest": "undefined",
      "process.env.NODE_ENV": '"production"',
    },
    ...options,
  } satisfies BuildOptions)
