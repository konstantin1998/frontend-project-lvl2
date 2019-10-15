import fs from 'fs';
import _ from 'lodash';
import path from 'path';

import parse from '../parsers';

const isObj = (arg) => {
  if (typeof (arg) === 'string') {
    return false;
  }

  if (Array.isArray(arg) === true) {
    return false;
  }

  if (typeof (arg) === 'object') {
    return true;
  }

  return false;
};

const differenceItem = (objBefore, objAfter, key) => {
  const diff = {};
  diff.prevVal = objBefore[key];
  diff.newVal = objAfter[key];
  diff.lastNested = true;
  const result = {};
  result[`${key}`] = diff;
  return result;
};


const isPlainKey = (obj1, obj2, key) => {
  if (_.has(obj1, key) && _.has(obj2, key)) {
    if (isObj(obj1[key]) && isObj(obj2[key])) {
      return false;
    }
  }
  return true;
};

const getDifference = (fileBeforePath, fileAfterPath) => {
  const fileBeforeExt = path.extname(path.basename(fileBeforePath));
  const fileAfterExt = path.extname(path.basename(fileAfterPath));

  if (fileBeforeExt !== fileAfterExt) {
    throw new Error('error: arguments must have the same extansion');
  }

  const fileBeforeContent = fs.readFileSync(fileBeforePath).toString();
  const fileAfterContent = fs.readFileSync(fileAfterPath).toString();
  const objBefore = parse(fileBeforeContent, fileBeforeExt);
  const objAfter = parse(fileAfterContent, fileAfterExt);

  const formDiff = (before, after) => {
    const allKeys = _.concat(Object.keys(before), Object.keys(after));
    const keys = _.uniq(allKeys.sort());

    const resultObj = keys.reduce((acc, key) => {
      if (isPlainKey(before, after, key)) {
        return { ...acc, ...differenceItem(before, after, key) };
      }
      acc[key] = formDiff(before[key], after[key]);
      return acc;
    }, {});

    return resultObj;
  };

  return formDiff(objBefore, objAfter);
};

export default getDifference;
/* const formDiff = (diffObj) => {
    const keys = Object.keys(diffObj);

    const resultObj = keys.reduce((acc, key) => {
      if (isPlainObj(diffObj.key)) {
        return { ...acc, ...differenceItem(diffObj.key) };
      }
      acc[`  ${key}`] = formDiff(diffObj.key);
      return acc;
    }, {});

    return resultObj;
  }; */
