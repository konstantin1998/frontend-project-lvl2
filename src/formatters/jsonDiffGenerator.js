// import _ from 'lodash';

/* const mapping = {
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
}; */

/* const passThroughTree = (acc, item) => {
  if (item.children !== undefined) {
    return { ...acc, ...{ [item.name]: item.children.reduce(passThroughTree, {}) } };
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
}; */

const diffGenerator = fileDifference => JSON.stringify(fileDifference);
// JSON.stringify(fileDifference.reduce(passThroughTree, {}));

export default diffGenerator;
