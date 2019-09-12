#!/usr/bin/env node

import objFormatCompare from './formatters/objectFormat/compare';
import plainFormatCompare from './formatters/plainFormat/diffGenerator';

const program = require('commander');

const args = [];
program.version('0.0.1').description('Compares two configuration files and shows a difference.');
program.arguments('<firstConfig> <secondConfig>').action((firstConfig, secondConfig) => {
  args.push(firstConfig);
  args.push(secondConfig);
});
/* action((firstConfig, secondConfig) => {
    diffObj.difference = comparator(firstConfig, secondConfig); }); */
program.option('-f, --format [type]', 'Output format', 'obj');
program.parse(process.argv);

const [firstConfig, secondConfig] = args;
if (program.format === 'plain') {
  console.log(plainFormatCompare(firstConfig, secondConfig));
} else {
  console.log(objFormatCompare(firstConfig, secondConfig));
}
