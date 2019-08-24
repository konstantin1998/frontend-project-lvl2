import comparator from '../src/bin/compare';

const fs = require('fs');
const _ = require('lodash');

const dirName = __dirname;
const filePaths = [ `${dirName}/__fixtures__/before.json`,
                    `${dirName}/__fixtures__/after.json`,
                    `${dirName}/__fixtures__/jsonDiff`,

                    `${dirName}/__fixtures__/before.yml`,
                    `${dirName}/__fixtures__/after.yml`,
                    `${dirName}/__fixtures__/ymlDiff`,

                    `${dirName}/__fixtures__/before.ini`,
                    `${dirName}/__fixtures__/after.ini`,
                    `${dirName}/__fixtures__/iniDiff`];
const chunkSize = 3;
const ArraysForTest = _.chunk(filePaths, chunkSize);
test.each(ArraysForTest)('compareTest', (fileBeforePath, fileAfterPath, rightAnswerPath) => {
                                          const right = fs.readFileSync(rightAnswerPath).toString().trim();
                                          const actual = comparator(fileBeforePath, fileAfterPath).trim();

                                          expect(actual).toEqual(right);
                                          });
/*test('jsonCompare', () => {
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
});*/
