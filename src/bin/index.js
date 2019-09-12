#!/usr/bin/env node
import compare from './formatters/plainFormat/diffGenerator';

const beforeFile = '/home/konstantin/js_project/__tests__/__fixtures__/plainFormatTest/before.yml';
const afterFile = '/home/konstantin/js_project/__tests__/__fixtures__/plainFormatTest/after.yml';

console.log(compare(beforeFile, afterFile));
