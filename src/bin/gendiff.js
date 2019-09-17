#!/usr/bin/env node

import objFormatCompare from './formatters/objectFormat/compare';
import plainFormatCompare from './formatters/plainFormat/diffGenerator';
import jsonFormatCompare from './formatters/jsonFormat/diffGenerator';

const program = require('commander');

const args = [];
program.version('0.0.1').description('Compares two configuration files and shows a difference.');
program.arguments('<firstConfig> <secondConfig>').action((firstConfig, secondConfig) => {
  args.push(firstConfig);
  args.push(secondConfig);
});
program.option('-f, --format [type]', 'Output format', 'obj');
program.parse(process.argv);

const [firstConfig, secondConfig] = args;
if (program.format === 'plain') {
  console.log(plainFormatCompare(firstConfig, secondConfig));
}
if (program.format === 'json') {
  console.log(jsonFormatCompare(firstConfig, secondConfig));
} else {
  console.log(objFormatCompare(firstConfig, secondConfig));
}
