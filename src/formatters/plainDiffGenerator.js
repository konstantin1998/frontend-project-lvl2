import _ from 'lodash';

const getFormattedValue = (arg) => {
  if (_.isPlainObject(arg)) {
    return '[complex value]';
  }
  if (typeof arg === 'string') {
    return `'${arg}'`;
  }
  return arg;
};

const getMessage = (item, path) => {
  switch (item.type) {
    case 'deleted': {
      const message = `Property '${path.join('.')}' was removed`;
      return message;
    }
    case 'changed': {
      const message = `Property '${path.join('.')}' was updated. From ${getFormattedValue(item.valueBefore)} to ${getFormattedValue(item.valueAfter)}`;
      return message;
    }
    case 'added': {
      const message = `Property '${path.join('.')}' was added with value: ${getFormattedValue(item.value)}`;
      return message;
    }
    default: {
      return null;
    }
  }
  /* const mapping = {
    unchanged: () => null,
    changed: (item, path) => {
      const message = `Property '${path.join('.')}' was updated.
       From ${getFormattedValue(item.valueBefore)} to ${getFormattedValue(item.valueAfter)}`;
      return message;
    },
    deleted: (item, path) => {
      const message = `Property '${path.join('.')}' was removed`;
      return message;
    },
    added: (item, path) => {
      const message = `Property '${path.join('.')}'
       was added with value: ${getFormattedValue(item.value)}`;
      return message;
    }, */
};

const hasChild = (item) => {
  if (item.children !== undefined) {
    return true;
  }

  return false;
};

const makeNewPath = (item, path) => [...path, item.name];

const diffGenerator = (fileDifference) => {
  const passThrowTree = (accum, item) => {
    const [acc, path] = accum;
    const newPath = makeNewPath(item, path);

    if (hasChild(item)) {
      const child = item.children;
      const updatedAcc = child.reduce(passThrowTree, [acc, newPath]);
      return [updatedAcc[0], path];
    }

    const message = getMessage(item, newPath);
    return [[...acc, message], path];
  };

  return _.compact(fileDifference.reduce(passThrowTree, [[], []])[0]).join('\n');
};

export default diffGenerator;
