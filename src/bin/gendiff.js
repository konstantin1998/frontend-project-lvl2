#!/usr/bin/env node

const program = require('commander');

program.version('0.0.1').description('Compares two configuration files and shows a difference.');
program.arguments('<firstConfig> <secondConfig>');
program.option('-f, --format [type]', 'Output format');

program.parse(process.argv);
