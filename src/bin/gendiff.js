#!/usr/bin/env node

import comparator from './jsonCompare';

const program = require('commander');

const diffObj = {};
program.version('0.0.1').description('Compares two configuration files and shows a difference.');
program.arguments('<firstConfig> <secondConfig>').action((firstConfig, secondConfig) => { diffObj.difference = comparator(firstConfig, secondConfig); });
program.option('-f, --format [type]', 'Output format');

program.parse(process.argv);
console.log(diffObj.difference);
