import comparator from '../src/bin/formatters/objectFormat/compare';

const fs = require('fs');
const _ = require('lodash');

const dirName = __dirname;
const filePaths = [
  `${dirName}/__fixtures__/objFormatTest/before.json`,
  `${dirName}/__fixtures__/objFormatTest/after.json`,
  `${dirName}/__fixtures__/objFormatTest/jsonDiff`,

  `${dirName}/__fixtures__/objFormatTest/before.yml`,
  `${dirName}/__fixtures__/objFormatTest/after.yml`,
  `${dirName}/__fixtures__/objFormatTest/ymlDiff`,

  `${dirName}/__fixtures__/objFormatTest/before.ini`,
  `${dirName}/__fixtures__/objFormatTest/after.ini`,
  `${dirName}/__fixtures__/objFormatTest/iniDiff`,

  `${dirName}/__fixtures__/objFormatTest/emptyObj1.json`,
  `${dirName}/__fixtures__/objFormatTest/emptyObj2.json`,
  `${dirName}/__fixtures__/objFormatTest/emptyDiff`];
const chunkSize = 3;
const ArraysForTest = _.chunk(filePaths, chunkSize);
test.each(ArraysForTest)('compareTest', (fileBeforePath, fileAfterPath, rightAnswerPath) => {
  const right = fs.readFileSync(rightAnswerPath).toString().trim();
  const actual = comparator(fileBeforePath, fileAfterPath).trim();

  expect(actual).toEqual(right);
});
