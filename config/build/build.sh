#!/bin/bash

function build {
  SECONDS=0
  buildClear
  echo "dist directory cleared"
  # @todo fix commonjs build
  # Vitest in-source testing broke commonjs build
  # possible solution is moving tests in separate file
  # but in this way we are loosing typescript checks
  # inside of test-cases
  # buildCjs
  # echo "cjs build completed"
  buildEsm
  echo "esm build completed"
  buildTypes
  echo "types build completed"
  buildCopy
  echo "manuals coping completed"
  echo "Elapsed time: $SECONDS seconds"
}

function buildClear {
  rm -rf dist
}

function buildCjs {
  tsc -p tsconfig.cjs.json
  createPackage commonjs _cjs
  npx tsc-alias -v --dir dist/_cjs -p tsconfig.cjs.json
}

function buildEsm {
  tsc -p tsconfig.esm.json
  createPackage module _esm
  npx tsc-alias -v --dir dist/_esm -p tsconfig.esm.json
}

function createPackage {
  echo {\"type\": \"$1\"} > dist/$2/package.json
}

function buildTypes {
  tsc -p tsconfig.types.json
  copyDtsFiles
  npx tsc-alias -v --dir dist/_types -p tsconfig.types.json
}

function buildCopy {
  cp package.json dist/package.json
  cp README.md dist/README.md
}

function copyDtsFiles {
  cp $(find ./src -name '*.d.ts') dist/_types
}

build
