#!/usr/bin/env node
import compare from './compare';

const beforeFile = '/home/konstantin/js_project/__tests__/__fixtures__/compareTest/before.json';
const afterFile = '/home/konstantin/js_project/__tests__/__fixtures__/compareTest/after.json';

console.log(compare(beforeFile, afterFile));
