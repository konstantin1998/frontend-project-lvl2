import comparator from '../src/bin/formatters/objectFormat/compare';

const fs = require('fs');
const _ = require('lodash');

const dirName = __dirname;
const filePaths = [
  `${dirName}/__fixtures__/testExamples/before.json`,
  `${dirName}/__fixtures__/testExamples/after.json`,
  `${dirName}/__fixtures__/rightAnswers/objFormat/jsonDiff`,

  `${dirName}/__fixtures__/testExamples/before.yml`,
  `${dirName}/__fixtures__/testExamples/after.yml`,
  `${dirName}/__fixtures__/rightAnswers/objFormat/ymlDiff`,

  `${dirName}/__fixtures__/testExamples/before.ini`,
  `${dirName}/__fixtures__/testExamples/after.ini`,
  `${dirName}/__fixtures__/rightAnswers/objFormat/iniDiff`,

  `${dirName}/__fixtures__/testExamples/emptyObj1.json`,
  `${dirName}/__fixtures__/testExamples/emptyObj2.json`,
  `${dirName}/__fixtures__/rightAnswers/objFormat/emptyDiff`];
const chunkSize = 3;
const ArraysForTest = _.chunk(filePaths, chunkSize);
test.each(ArraysForTest)('compareTest', (fileBeforePath, fileAfterPath, rightAnswerPath) => {
  const right = fs.readFileSync(rightAnswerPath).toString().trim();
  const actual = comparator(fileBeforePath, fileAfterPath).trim();

  expect(actual).toEqual(right);
});
