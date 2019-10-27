import _ from 'lodash';

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

const objToString = (object) => {
  const createGap = (key) => {
    const keyString = `${key}`;
    if ((keyString[0] === '+') || (keyString[0] === '-')) {
      return '      ';
    }
    return '    ';
  };

  const objToLines = (obj, gap = '  ') => {
    const keys = Object.getOwnPropertyNames(obj);

    const result = keys.reduce((acc, key) => {
      const insideObjGap = createGap(key);
      if (isObj(obj[key])) {
        const newGap = `${gap}${insideObjGap}`;
        return _.concat(acc, `${gap}${key}: {`, objToLines(obj[key], newGap), `${gap}  }`);
      }
      return _.concat(acc, `${gap}${key}: ${obj[key]}`);
    }, []);

    return result;
  };

  return _.join(_.concat('{', objToLines(object), '}'), '\n');
};

const differenceItem = (plainObj, key) => {
  if ((plainObj.prevVal !== undefined) && (plainObj.newVal !== undefined)) {
    if (plainObj.prevVal === plainObj.newVal) {
      const diff = {};
      diff[`  ${key}`] = plainObj.newVal;
      return diff;
    }

    const diff = {};
    diff[`- ${key}`] = plainObj.prevVal;
    diff[`+ ${key}`] = plainObj.newVal;
    return diff;
  }

  if (plainObj.prevVal !== undefined) {
    const diff = {};
    diff[`- ${key}`] = plainObj.prevVal;
    return diff;
  }

  const diff = {};
  diff[`+ ${key}`] = plainObj.newVal;
  return diff;
};

const isPlainObj = obj => obj.lastNested;

const diffGenerator = (fileDifference) => {
  const correctObjKeys = (diff) => {
    const keys = Object.keys(diff);

    const result = keys.reduce((acc, key) => {
      if (isPlainObj(diff[key])) {
        return { ...acc, ...differenceItem(diff[key], key) };
      }
      const correctedKey = `  ${key}`;
      acc[correctedKey] = correctObjKeys(diff[key]);
      return acc;
    }, {});
    return result;
  };

  const diffObj = correctObjKeys(fileDifference);
  return objToString(diffObj);
};

export default diffGenerator;
