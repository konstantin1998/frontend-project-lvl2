import _ from 'lodash';
import fs from 'fs';

import compare from '../src';

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
  const format = 'obj';
  const rightAnswerPath = `${__dirname}/__fixtures__/rightAnswers/objFormat`;
  const right = fs.readFileSync(rightAnswerPath).toString().trim();
  const actual = compare(fileBeforePath, fileAfterPath, format).trim();

  expect(actual).toEqual(right);
});

test.each(arraysForTest)('plainFormatTest', (fileBeforePath, fileAfterPath) => {
  const format = 'plain';
  const rightAnswerPath = `${__dirname}/__fixtures__/rightAnswers/plainFormat`;
  const expected = fs.readFileSync(rightAnswerPath).toString().trim().split('\n')
    .sort()
    .join('\n');
  const actual = compare(fileBeforePath, fileAfterPath, format).trim().split('\n').sort()
    .join('\n');

  expect(actual).toEqual(expected);
});

test.each(arraysForTest)('jsonFormatTest', (fileBeforePath, fileAfterPath) => {
  const format = 'json';
  const rightAnswerPath = `${__dirname}/__fixtures__/rightAnswers/jsonFormat`;
  const expected = JSON.parse(fs.readFileSync(rightAnswerPath).toString().trim());
  const actual = JSON.parse(compare(fileBeforePath, fileAfterPath, format));

  expect(actual).toEqual(expected);
});
