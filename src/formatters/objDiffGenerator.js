import _ from 'lodash';

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
      if (_.isPlainObject(obj[key])) {
        const newGap = `${gap}${insideObjGap}`;
        return _.concat(acc, `${gap}${key}: {`, objToLines(obj[key], newGap), `${gap}  }`);
      }
      return _.concat(acc, `${gap}${key}: ${obj[key]}`);
    }, []);

    return result;
  };

  return _.join(_.concat('{', objToLines(object), '}'), '\n');
};

const differenceItem = (node, key) => {
  const mapping = {
    unchanged: (obj, propName) => _.fromPairs([[`  ${propName}`, obj.value]]),
    changed: (obj, propName) => _.fromPairs([[`- ${propName}`, obj.valueBefore], [`+ ${propName}`, obj.valueAfter]]),
    deleted: (obj, propName) => _.fromPairs([[`- ${propName}`, obj.value]]),
    added: (obj, propName) => _.fromPairs([[`+ ${propName}`, obj.value]]),
  };
  return mapping[node.type](node, key);
};

const isPlainNode = node => node.lastNested;

const diffGenerator = (fileDifference) => {
  const correctObjKeys = (diff) => {
    const keys = Object.keys(diff);

    const result = keys.reduce((acc, key) => {
      if (isPlainNode(diff[key])) {
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
