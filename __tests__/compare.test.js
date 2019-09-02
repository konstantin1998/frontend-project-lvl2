import comparator from '../src/bin/compare';

const fs = require('fs');
const _ = require('lodash');

const dirName = __dirname;
const filePaths = [`${dirName}/__fixtures__/compareTest/before.json`,
  `${dirName}/__fixtures__/compareTest/after.json`,
  `${dirName}/__fixtures__/compareTest/jsonDiff`,

  `${dirName}/__fixtures__/compareTest/before.yml`,
  `${dirName}/__fixtures__/compareTest/after.yml`,
  `${dirName}/__fixtures__/compareTest/ymlDiff`,

  `${dirName}/__fixtures__/compareTest/before.ini`,
  `${dirName}/__fixtures__/compareTest/after.ini`,
  `${dirName}/__fixtures__/compareTest/iniDiff`];
const chunkSize = 3;
const ArraysForTest = _.chunk(filePaths, chunkSize);
test.each(ArraysForTest)('compareTest', (fileBeforePath, fileAfterPath, rightAnswerPath) => {
  const right = fs.readFileSync(rightAnswerPath).toString().trim();
  const actual = comparator(fileBeforePath, fileAfterPath).trim();

  expect(actual).toEqual(right);
});
