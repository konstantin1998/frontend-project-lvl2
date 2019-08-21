import comparator from '../src/bin/jsonCompare';

const fs = require('fs');

const dirName = __dirname;
const fileBeforePath = `${dirName}/__fixtures__/jsonBefore`;
const fileAfterPath = `${dirName}/__fixtures__/jsonAfter`;
const rightAnswerPath = `${dirName}/__fixtures__/diff`;

const right = fs.readFileSync(rightAnswerPath).toString().trim();
const actual = comparator(fileBeforePath, fileAfterPath).trim();
test('jsonCompare', () => {
  expect(actual).toEqual(right);
});
