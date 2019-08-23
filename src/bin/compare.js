import parse from './parsers';

const fs = require('fs');
const _ = require('lodash');
const path = require('path');

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
  const fileBeforeExt = path.extname(path.basename(fileBeforePath));
  const fileAfterExt = path.extname(path.basename(fileAfterPath));

  if (fileBeforeExt !== fileAfterExt) {
    throw new Error('error: arguments must have the same extansion');
  }

  const fileBeforeContent = fs.readFileSync(fileBeforePath).toString();
  const fileAfterContent = fs.readFileSync(fileAfterPath).toString();
  const ObjBefore = parse(fileBeforeContent, fileBeforeExt);
  const ObjAfter = parse(fileAfterContent, fileAfterExt);

  const allKeys = _.concat(Object.keys(ObjBefore), Object.keys(ObjAfter));
  const keys = _.uniq(allKeys);
  const difference = key => differenceItem(ObjBefore, ObjAfter, key);
  const diff = keys.map(difference).join('\n');

  return ['{', diff, '}'].join('\n');
};

export default comparator;
