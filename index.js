const fs = require('fs');
const _ = require('lodash');

const differenceItem = (objBefore, objAfter, key) => {
  if (_.has(objBefore, key) && _.has(objAfter, key)) {
    if (objBefore[key] === objAfter[key]) {
      const diff = `  ${key}:${objAfter[key]};`;
      return diff;
    }
    const diff = [`  -${key}:${objBefore[key]};`, `  +${key}:${objAfter[key]};`].join('\n');
    return diff;
  }
  if (_.has(objBefore, key)) {
    const diff = `  -${key}:${objBefore[key]};`;
    return diff;
  }
  const diff = `  +${key}:${objAfter[key]};`;
  return diff;
};

const comparator = (fileBeforePath, fileAfterPath) => {
  const fileBeforeContent = fs.readFileSync(fileBeforePath);
  const fileAfterContent = fs.readFileSync(fileAfterPath);
  const jsonObjBefore = JSON.parse(fileBeforeContent);
  const jsonObjAfter = JSON.parse(fileAfterContent);

  const allKeys = _.concat(Object.keys(jsonObjBefore), Object.keys(jsonObjAfter));
  const keys = _.uniq(allKeys);
  const difference = key => differenceItem(jsonObjBefore, jsonObjAfter, key);
  const jsonDiff = keys.map(difference).join('\n');

  return ['{', jsonDiff, '}'].join('\n');
};

export default comparator;
