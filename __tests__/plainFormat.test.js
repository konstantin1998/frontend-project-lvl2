import comparator from '../src/bin/formatters/plainFormat/diffGenerator';

const fs = require('fs');
const _ = require('lodash');

const dirName = __dirname;
const filePaths = [
  `${dirName}/__fixtures__/testExamples/before.json`,
  `${dirName}/__fixtures__/testExamples/after.json`,
  `${dirName}/__fixtures__/rightAnswers/plainFormat/jsonDiff`,

  `${dirName}/__fixtures__/testExamples/before.yml`,
  `${dirName}/__fixtures__/testExamples/after.yml`,
  `${dirName}/__fixtures__/rightAnswers/plainFormat/ymlDiff`,

  `${dirName}/__fixtures__/testExamples/before.ini`,
  `${dirName}/__fixtures__/testExamples/after.ini`,
  `${dirName}/__fixtures__/rightAnswers/plainFormat/iniDiff`,

  `${dirName}/__fixtures__/testExamples/emptyObj1.json`,
  `${dirName}/__fixtures__/testExamples/emptyObj2.json`,
  `${dirName}/__fixtures__/rightAnswers/plainFormat/emptyDiff`];
const chunkSize = 3;
const ArraysForTest = _.chunk(filePaths, chunkSize);

test.each(ArraysForTest)('plainFormatTest', (fileBeforePath, fileAfterPath, rightAnswerPath) => {
  const expected = fs.readFileSync(rightAnswerPath).toString().trim().split('\n');
  const actual = comparator(fileBeforePath, fileAfterPath).trim().split('\n');
  const expectedToLines = expected.sort();
  const actualToLines = actual.sort();

  expect(actualToLines).toEqual(expectedToLines);
});
