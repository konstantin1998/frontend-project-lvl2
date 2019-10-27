#!/usr/bin/env node

import program from 'commander';

import compare from '..';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'obj')
  .action((firstConfig, secondConfig) => {
    console.log(compare(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
