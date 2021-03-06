#!/bin/bash
rm -rf ./build
./node_modules/.bin/babel --stage 0 --out-dir ./build/components ./src/components
./node_modules/.bin/babel --stage 0 --out-dir ./build/util ./src/util
find ./build -type f -name '*.jsx' -exec sh -c 'mv -f $0 ${0%.jsx}.js' {} \;