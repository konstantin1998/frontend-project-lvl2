import _ from 'lodash';

import parse from './parsers';

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

const getDifference = (fileContentBefore, fileContentAfter, fileType) => {
  const objBefore = parse(fileContentBefore, fileType);
  const objAfter = parse(fileContentAfter, fileType);

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
