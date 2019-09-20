import getPlainDiff from '../src/bin/formatters/plainFormat/diffGenerator';
import getObjDiff from '../src/bin/formatters/objectFormat/diffGenerator';
import getJsonDiff from '../src/bin/formatters/jsonFormat/diffGenerator';

const _ = require('lodash');
const fs = require('fs');

const testExamples = [
  `${__dirname}/__fixtures__/testExamples/before.ini`,
  `${__dirname}/__fixtures__/testExamples/after.ini`,
  `${__dirname}/__fixtures__/testExamples/before.yml`,
  `${__dirname}/__fixtures__/testExamples/after.yml`,
  `${__dirname}/__fixtures__/testExamples/before.json`,
  `${__dirname}/__fixtures__/testExamples/after.json`,
];
const chunkSize = 2;
const arraysForTest = _.chunk(testExamples, chunkSize);

test.each(arraysForTest)('objFormatTest', (fileBeforePath, fileAfterPath) => {
  const rightAnswerPath = `${__dirname}/__fixtures__/rightAnswers/objFormat`;
  const right = fs.readFileSync(rightAnswerPath).toString().trim();
  const actual = getObjDiff(fileBeforePath, fileAfterPath).trim();

  expect(actual).toEqual(right);
});

test.each(arraysForTest)('plainFormatTest', (fileBeforePath, fileAfterPath) => {
  const rightAnswerPath = `${__dirname}/__fixtures__/rightAnswers/plainFormat`;
  const expected = fs.readFileSync(rightAnswerPath).toString().trim().split('\n');
  const actual = getPlainDiff(fileBeforePath, fileAfterPath).trim().split('\n');
  const expectedToLines = expected.sort();
  const actualToLines = actual.sort();

  expect(actualToLines).toEqual(expectedToLines);
});

test.each(arraysForTest)('jsonFormatTest', (fileBeforePath, fileAfterPath) => {
  const rightAnswerPath = `${__dirname}/__fixtures__/rightAnswers/jsonFormat`;
  const expected = JSON.parse(fs.readFileSync(rightAnswerPath).toString().trim());
  const actual = JSON.parse(getJsonDiff(fileBeforePath, fileAfterPath));

  expect(actual).toEqual(expected);
});
