#!/usr/bin/env sh

set -e

cp node_modules/markdown-it/dist/markdown-it.min.js files/
cp node_modules/markdown-it-task-checkbox/index.js files/markdown-it-checkbox.min.js
cp node_modules/highlightjs/highlight.pack.min.js files/
cp node_modules/highlightjs/styles/github.css files/
