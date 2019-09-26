#!/usr/bin/env node

import program from 'commander';

import compare from './compare';

const args = [];
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    args.push(firstConfig);
    args.push(secondConfig);
  })
  .option('-f, --format [type]', 'Output format', 'obj')
  .parse(process.argv);

const [firstConfig, secondConfig] = args;
console.log(compare(firstConfig, secondConfig, program.format));
