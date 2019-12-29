// import _ from 'lodash';

const mapping = {
  unchanged: item => ({ [item.name]: { type: item.type, value: item.value } }),
  changed: item => ({
    [item.name]: {
      type: item.type,
      valueBefore: item.valueBefore,
      valueAfter: item.valueAfter,
    },
  }),
  deleted: item => ({ [item.name]: { type: item.type, value: item.value } }),
  added: item => ({ [item.name]: { type: item.type, value: item.value } }),
};

const passThroughTree = (acc, item) => {
  if (item.children !== undefined) {
    return { ...acc, ...{ [item.name]: item.children.reduce(passThroughTree, {}) } };
  }
  return { ...acc, ...mapping[item.type](item) };
};

const diffGenerator = fileDifference => JSON.stringify(fileDifference.reduce(passThroughTree, {}));

export default diffGenerator;
