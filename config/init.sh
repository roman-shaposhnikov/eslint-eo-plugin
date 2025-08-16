#!/bin/bash

function copyGitHooks {
  cp ./config/git/hooks/* ./.git/hooks &&
  echo "Client git hooks installed"
}

function installDependencies {
  npm ci &&
  echo "All dependencies installed"
}

function runTests {
  npm run test &&
  echo "All tests passed"
}

function buildProject {
  npm run build &&
  echo "The project builded without errors"
}

function printPartingWords {
  echo "Happy coding!"
}

copyGitHooks &&
installDependencies &&
runTests &&
buildProject &&
printPartingWords
