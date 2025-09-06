#!/bin/bash

function build {
  SECONDS=0

  buildClear
  echo "dist directory cleared"
  CLEANING_TIME=$SECONDS

  buildCjs
  echo "cjs build completed"
  CJS_BUILD_TIME=$(($SECONDS-$CLEANING_TIME))
  echo "Cjs build time: $CJS_BUILD_TIME seconds"

  buildEsm
  echo "esm build completed"
  ESM_BUILD_TIME=$(($SECONDS-$CJS_BUILD_TIME))
  echo "Esm build time: $ESM_BUILD_TIME seconds"

  buildTypes
  echo "types build completed"
  TYPES_BUILD_TIME=$(($SECONDS-$ESM_BUILD_TIME))
  echo "Types build time: $TYPES_BUILD_TIME seconds"

  buildCopy
  echo "manuals coping completed"

  echo "Elapsed time: $SECONDS seconds"
}

function buildClear {
  rm -rf dist
}

function buildCjs {
  npx jiti ./config/build/build.cjs.ts
  createPackage commonjs _cjs
  npx tsc-alias -v --dir dist/_cjs -p tsconfig.cjs.json
}

function buildEsm {
  npx jiti ./config/build/build.esm.ts
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
  cp docs/README.md dist/README.md
}

function copyDtsFiles {
  cp $(find ./src -name '*.d.ts') dist/_types
}

build
