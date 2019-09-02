import objToStr from '../src/bin/render';

const fs = require('fs');
const _ = require('lodash');

const testFilePaths = [
  `${__dirname}/__fixtures__/renderTest/test1`,
  `${__dirname}/__fixtures__/renderTest/expect1`,

  `${__dirname}/__fixtures__/renderTest/test2`,
  `${__dirname}/__fixtures__/renderTest/expect2`,

  `${__dirname}/__fixtures__/renderTest/test3`,
  `${__dirname}/__fixtures__/renderTest/expect3`,

  `${__dirname}/__fixtures__/renderTest/test4`,
  `${__dirname}/__fixtures__/renderTest/expect4`,
];
const chunkSize = 2;
const ArraysForTest = _.chunk(testFilePaths, chunkSize);

test.each(ArraysForTest)('renderTest', (testFilePath, expectFilePath) => {
  const testFileContent = fs.readFileSync(testFilePath).toString().trim();
  const testObj = JSON.parse(testFileContent);
  const received = objToStr(testObj);
  const actual = fs.readFileSync(expectFilePath).toString().trim();
  expect(actual).toEqual(received);
});
