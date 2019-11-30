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

const getUpdatedPath = (path, type) => {
  const nameMapping = {
    unchanged: key => `  ${key}`,
    deleted: key => `- ${key}`,
    added: key => `+ ${key}`,
  };

  const key = _.last(path);
  const keysWithoutLast = path.slice(0, path.length - 1);
  const newKey = nameMapping[type](key);
  const updatedKeys = _.concat(keysWithoutLast.map(item => `  ${item}`), newKey);
  const updatedPath = updatedKeys.join('.');
  return updatedPath;
};

const mapping = {
  unchanged: item => ({ path: getUpdatedPath(item.path, item.type), value: item.value }),
  deleted: item => ({ path: getUpdatedPath(item.path, item.type), value: item.value }),
  added: item => ({ path: getUpdatedPath(item.path, item.type), value: item.value }),
  changed: (item) => {
    const lastKey = _.last(item.path);
    const keysWithoutLast = item.path.slice(0, item.path.length - 1);
    const keyBefore = `- ${lastKey}`;
    const keyAfter = `+ ${lastKey}`;
    const updatedKeysBefore = _.concat(keysWithoutLast.map(keyName => `  ${keyName}`), keyBefore);
    const updatedKeysAfter = _.concat(keysWithoutLast.map(keyName => `  ${keyName}`), keyAfter);
    const updatedPathBefore = updatedKeysBefore.join('.');
    const updatedPathAfter = updatedKeysAfter.join('.');

    return [
      { path: updatedPathBefore, value: item.valueBefore },
      { path: updatedPathAfter, value: item.valueAfter },
    ];
  },
};

const diffGenerator = (fileDifference) => {
  const diffObj = _.flatten(fileDifference.map(item => mapping[item.type](item)))
    .reduce((acc, item) => _.set(acc, item.path, item.value), {});
  return objToString(diffObj);
};

export default diffGenerator;
