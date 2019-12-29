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

const diffGenerator = (fileDifference) => {
  const mapping = {
    unchanged: () => null,
    changed: (item, path) => {
      const message = `Property '${path.join('.')}' was updated. From ${getFormattedValue(item.valueBefore)} to ${getFormattedValue(item.valueAfter)}`;
      return message;
    },
    deleted: (item, path) => {
      const message = `Property '${path.join('.')}' was removed`;
      return message;
    },
    added: (item, path) => {
      const message = `Property '${path.join('.')}' was added with value: ${getFormattedValue(item.value)}`;
      return message;
    },
  };

  /* const passThroughTree = (acc, item, path) => {
    const messages = acc;
    const updatedPath = _.concat(path, item.name);
    if (item.children !== undefined) {
      return item.children.reduce(passThroughTree, [messages, updatedPath]);
    }
    const message = mapping[item.type](item, updatedPath);
    return [_.concat(messages, message), path];
  }; */
  const passThroughTree = (arr, acc, path) => {
    const messages = arr.filter(item => (item.children === undefined)).map((item) => {
      const newPath = [...path, item.name];// _.concat(path, item.name);
      return mapping[item.type](item, newPath);
    });

    const newAcc = [...acc, ...messages]; // _.concat(acc, messages);
    return arr.filter(item => (item.children !== undefined)).reduce((accum, item) => {
      const newPath = [...path, item.name];// _.concat(path, item.name);
      return passThroughTree(item.children, accum, newPath);
    }, newAcc);
  };

  return _.compact(passThroughTree(fileDifference, [], [])).join('\n');
};

export default diffGenerator;
