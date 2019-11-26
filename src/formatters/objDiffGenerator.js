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
  const mapping = {
    unchanged: key => `  ${key}`,
    deleted: key => `- ${key}`,
    added: key => `+ ${key}`,
  };
  const keys = path.split('.');
  const key = _.last(keys);
  const keysWithoutLast = keys.slice(0, keys.length - 1);
  const newKey = mapping[type](key);
  const updatedKeys = _.concat(keysWithoutLast.map(item => `  ${item}`), newKey);
  const updatedPath = updatedKeys.join('.');
  return updatedPath;
};

const diffGenerator = (fileDifference) => {
  const updatedFileDifference = fileDifference.map((item) => {
    if (item.type !== 'changed') {
      return { path: getUpdatedPath(item.path, item.type), value: item.value };
    }

    const keys = item.path.split('.');
    const key = _.last(keys);
    const keysWithoutLast = keys.slice(0, keys.length - 1);
    const keyBefore = `- ${key}`;
    const keyAfter = `+ ${key}`;
    const updatedKeysBefore = _.concat(keysWithoutLast.map(keyName => `  ${keyName}`), keyBefore);
    const updatedKeysAfter = _.concat(keysWithoutLast.map(keyName => `  ${keyName}`), keyAfter);
    const updatedPathBefore = updatedKeysBefore.join('.');
    const updatedPathAfter = updatedKeysAfter.join('.');

    return [
      { path: updatedPathBefore, value: item.valueBefore },
      { path: updatedPathAfter, value: item.valueAfter },
    ];
  });

  const diffObj = _.flatten(updatedFileDifference)
    .reduce((acc, item) => _.set(acc, item.path, item.value), {});
  return objToString(diffObj);
};

export default diffGenerator;
