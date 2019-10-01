import _ from 'lodash';
import fs from 'fs';

import compare from '../src';

const testExamples = ['before.ini', 'after.ini', 'before.yml', 'after.yml', 'before.json', 'after.json'];
const testDirPath = `${__dirname}/__fixtures__/testExamples`;
const rightAnswersDirPath = `${__dirname}/__fixtures__/rightAnswers`;
const chunkSize = 2;
const arraysForTest = _.chunk(testExamples, chunkSize);

test.each(arraysForTest)('objFormatTest', (before, after) => {
  const fileBeforePath = `${testDirPath}/${before}`;
  const fileAfterPath = `${testDirPath}/${after}`;
  const rightAnswerPath = `${rightAnswersDirPath}/objFormat`;
  const format = 'obj';
  const expected = fs.readFileSync(rightAnswerPath).toString().trim();
  const actual = compare(fileBeforePath, fileAfterPath, format).trim();

  expect(actual).toEqual(expected);
});

test.each(arraysForTest)('plainFormatTest', (before, after) => {
  const fileBeforePath = `${testDirPath}/${before}`;
  const fileAfterPath = `${testDirPath}/${after}`;
  const rightAnswerPath = `${rightAnswersDirPath}/plainFormat`;
  const format = 'plain';
  const expected = fs.readFileSync(rightAnswerPath).toString().trim();
  const actual = compare(fileBeforePath, fileAfterPath, format).trim();

  expect(actual).toEqual(expected);
});

test.each(arraysForTest)('jsonFormatTest', (before, after) => {
  const fileBeforePath = `${testDirPath}/${before}`;
  const fileAfterPath = `${testDirPath}/${after}`;
  const rightAnswerPath = `${rightAnswersDirPath}/jsonFormat`;
  const format = 'json';
  const expected = JSON.parse(fs.readFileSync(rightAnswerPath).toString().trim());
  const actual = JSON.parse(compare(fileBeforePath, fileAfterPath, format));

  expect(actual).toEqual(expected);
});
