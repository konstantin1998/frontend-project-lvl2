import comparator from '../src/bin/formatters/jsonFormat/diffGenerator';

const fs = require('fs');
const _ = require('lodash');

const dirName = __dirname;
const filePaths = [
  `${dirName}/__fixtures__/testExamples/before.json`,
  `${dirName}/__fixtures__/testExamples/after.json`,
  `${dirName}/__fixtures__/rightAnswers/jsonFormat/jsonDiff`,

  `${dirName}/__fixtures__/testExamples/before.yml`,
  `${dirName}/__fixtures__/testExamples/after.yml`,
  `${dirName}/__fixtures__/rightAnswers/jsonFormat/ymlDiff`,

  `${dirName}/__fixtures__/testExamples/before.ini`,
  `${dirName}/__fixtures__/testExamples/after.ini`,
  `${dirName}/__fixtures__/rightAnswers/jsonFormat/iniDiff`,

  `${dirName}/__fixtures__/testExamples/emptyObj1.json`,
  `${dirName}/__fixtures__/testExamples/emptyObj2.json`,
  `${dirName}/__fixtures__/rightAnswers/jsonFormat/emptyDiff`];
const chunkSize = 3;
const ArraysForTest = _.chunk(filePaths, chunkSize);

test.each(ArraysForTest)('jsonFormatTest', (fileBeforePath, fileAfterPath, rightAnswerPath) => {
  const expected = JSON.parse(fs.readFileSync(rightAnswerPath).toString().trim());
  const actual = JSON.parse(comparator(fileBeforePath, fileAfterPath));

  expect(actual).toEqual(expected);
});
