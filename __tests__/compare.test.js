import comparator from '../src/bin/compare';

const fs = require('fs');

const dirName = __dirname;

test('jsonCompare', () => {
  const fileBeforePath = `${dirName}/__fixtures__/before.json`;
  const fileAfterPath = `${dirName}/__fixtures__/after.json`;
  const rightAnswerPath = `${dirName}/__fixtures__/jsonDiff`;
  const right = fs.readFileSync(rightAnswerPath).toString().trim();
  const actual = comparator(fileBeforePath, fileAfterPath).trim();

  expect(actual).toEqual(right);
});

test('yamlCompare', () => {
  const fileBeforePath = `${dirName}/__fixtures__/before.yml`;
  const fileAfterPath = `${dirName}/__fixtures__/after.yml`;
  const rightAnswerPath = `${dirName}/__fixtures__/yamlDiff`;
  const right = fs.readFileSync(rightAnswerPath).toString().trim();
  const actual = comparator(fileBeforePath, fileAfterPath).trim();

  expect(actual).toEqual(right);
});
