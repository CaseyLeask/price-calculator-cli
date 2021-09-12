#!/usr/bin/env node

import { cli } from '../index.js'

// process.argv (or argument values) is an array of arguments passed to the Node.js process
//
// Array arguments are:
// 0: process.execPath
// 1: /path/to/this/file.js
// ...restParameters: Any additional command-line arguments passed to Node.js
//
// We only care about 'restParameters' here
cli(process.argv.slice(2));