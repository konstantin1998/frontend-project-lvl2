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

/* const getUpdatedPath = (path, type) => {
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
  unchanged: (acc, item) => _.set(acc, getUpdatedPath(item.path, item.type), item.value),
  // ({ path: getUpdatedPath(item.path, item.type), value: item.value }),
  deleted: (acc, item) => _.set(acc, getUpdatedPath(item.path, item.type), item.value),
  added: (acc, item) => _.set(acc, getUpdatedPath(item.path, item.type), item.value),
  changed: (acc, item) => {
    const lastKey = _.last(item.path);
    const keysWithoutLast = item.path.slice(0, item.path.length - 1);
    const keyBefore = `- ${lastKey}`;
    const keyAfter = `+ ${lastKey}`;
    const updatedKeysBefore = _.concat(keysWithoutLast.map(keyName => `  ${keyName}`), keyBefore);
    const updatedKeysAfter = _.concat(keysWithoutLast.map(keyName => `  ${keyName}`), keyAfter);
    const updatedPathBefore = updatedKeysBefore.join('.');
    const updatedPathAfter = updatedKeysAfter.join('.');

    return _.set(
      _.set(acc, updatedPathBefore, item.valueBefore), updatedPathAfter, item.valueAfter,
    );
  },
}; */
const mapping = {
  unchanged: (item) => {
    const updatedName = `  ${item.name}`;
    return { [updatedName]: item.value };
  },
  deleted: (item) => {
    const updatedName = `- ${item.name}`;
    return { [updatedName]: item.value };
  },
  added: (item) => {
    const updatedName = `+ ${item.name}`;
    return { [updatedName]: item.value };
  },
  changed: (item) => {
    const updatedNameBefore = `- ${item.name}`;
    const updatedNameAfter = `+ ${item.name}`;
    return { [updatedNameBefore]: item.valueBefore, [updatedNameAfter]: item.valueAfter };
  },
};

const passThroughTree = (acc, item) => {
  if (item.children !== undefined) {
    const newName = `  ${item.name}`;
    return { ...acc, ...{ [newName]: item.children.reduce(passThroughTree, {}) } };
  }
  return { ...acc, ...mapping[item.type](item) };
};

const diffGenerator = (fileDifference) => {
  const diffObj = fileDifference.reduce(passThroughTree, {});
  return objToString(diffObj);
};

export default diffGenerator;
