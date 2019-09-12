import comparator from '../src/bin/formatters/plainFormat/diffGenerator';

const fs = require('fs');
const _ = require('lodash');

const dirName = __dirname;
const filePaths = [
  `${dirName}/__fixtures__/plainFormatTest/before.json`,
  `${dirName}/__fixtures__/plainFormatTest/after.json`,
  `${dirName}/__fixtures__/plainFormatTest/jsonDiff`,

  `${dirName}/__fixtures__/plainFormatTest/before.yml`,
  `${dirName}/__fixtures__/plainFormatTest/after.yml`,
  `${dirName}/__fixtures__/plainFormatTest/ymlDiff`,

  `${dirName}/__fixtures__/plainFormatTest/before.ini`,
  `${dirName}/__fixtures__/plainFormatTest/after.ini`,
  `${dirName}/__fixtures__/plainFormatTest/iniDiff`,

  `${dirName}/__fixtures__/plainFormatTest/emptyObj1.json`,
  `${dirName}/__fixtures__/plainFormatTest/emptyObj2.json`,
  `${dirName}/__fixtures__/plainFormatTest/emptyDiff`];
const chunkSize = 3;
const ArraysForTest = _.chunk(filePaths, chunkSize);

test.each(ArraysForTest)('plainFormatTest', (fileBeforePath, fileAfterPath, rightAnswerPath) => {
  const expected = fs.readFileSync(rightAnswerPath).toString().trim().split('\n');
  const actual = comparator(fileBeforePath, fileAfterPath).trim().split('\n');
  const expectedToLines = expected.sort();
  const actualToLines = actual.sort();

  expect(actualToLines).toEqual(expectedToLines);
});
