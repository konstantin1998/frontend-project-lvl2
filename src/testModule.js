#!/usr/bin/env node
import fs from 'fs';
import getDif from './getDifference';
import jsonDiff from './formatters/jsonDiffGenerator';

const fileAfterPath = '/home/konstantin/js_project/__tests__/__fixtures__/testExamples/after.json';
const fileBeforePath = '/home/konstantin/js_project/__tests__/__fixtures__/testExamples/before.json';
const objBefore = JSON.parse(fs.readFileSync(fileBeforePath).toString());
const objAfter = JSON.parse(fs.readFileSync(fileAfterPath).toString());

const diff = jsonDiff(getDif(objBefore, objAfter));

console.log(diff);
