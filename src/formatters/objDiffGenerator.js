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

/* const mapping = {
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
}; */

const passThroughTree = (acc, item) => {
  if (item.children !== undefined) {
    const newName = `  ${item.name}`;
    return { ...acc, ...{ [newName]: item.children.reduce(passThroughTree, {}) } };
  }
  switch (item.type) {
    case 'unchanged': {
      const updatedName = `  ${item.name}`;
      return { ...acc, ...{ [updatedName]: item.value } };
    }
    case 'deleted': {
      const updatedName = `- ${item.name}`;
      return { ...acc, ...{ [updatedName]: item.value } };
    }

    case 'added': {
      const updatedName = `+ ${item.name}`;
      return { ...acc, ...{ [updatedName]: item.value } };
    }

    default: {
      const updatedNameBefore = `- ${item.name}`;
      const updatedNameAfter = `+ ${item.name}`;
      return {
        ...acc,
        ...{ [updatedNameBefore]: item.valueBefore, [updatedNameAfter]: item.valueAfter },
      };
    }
  }
};

const diffGenerator = (fileDifference) => {
  const diffObj = fileDifference.reduce(passThroughTree, {});
  return objToString(diffObj);
};

export default diffGenerator;
