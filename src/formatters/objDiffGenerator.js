/* const hasChild = (item) => {
  if (item.children !== undefined) {
    return true;
  }

  return false;
}; */

/* const itemToStrings = (item, gap) => {
  if (item.type === 'changed') {
    return [`${gap}- ${item.name}: ${item.valueBefore}`,
    `${gap}+ ${item.name}: ${item.valueAfter}`];
  }
  if (item.type === 'added') {
    return [`${gap}+ ${item.name}: ${item.value}`];
  }
  if (item.type === 'deleted') {
    return [`${gap}- ${item.name}: ${item.value}`];
  }
  return [`${gap}  ${item.name}: ${item.value}`];
}; */

const diffGenerator = (fileDifference) => {
  const passThroughTree = (accum, item) => {
    const [acc, gap] = accum;
    if (item.type === 'changed') {
      const newAcc = acc.concat([`${gap}- ${item.name}: ${item.valueBefore}`, `${gap}+ ${item.name}: ${item.valueAfter}`]);
      return [newAcc, gap];
    }
    if (item.type === 'added') {
      const newAcc = acc.concat(`${gap}+ ${item.name}: ${item.value}`);
      return [newAcc, gap];
    }
    if (item.type === 'deleted') {
      const newAcc = acc.concat(`${gap}- ${item.name}: ${item.value}`);
      return [newAcc, gap];
    }
    if (item.type === 'unchanged') {
      const newAcc = acc.concat(`${gap}  ${item.name}: ${item.value}`);
      return [newAcc, gap];
    }

    const child = item.children;
    const newAcc = acc.concat(`${gap}  ${item.name}: {`, child.reduce(passThroughTree, [[], `${gap}    `])[0], `${gap}  }`);
    return [newAcc, gap];
    /* if (hasChild(item)) {
      const child = item.children;
      const newAcc = acc.concat(`${gap}  ${item.name}: {`, child.reduce(passThroughTree,
        [[], `${gap}    `])[0], `${gap}  }`);
      return [newAcc, gap];
    }
    const newAcc = acc.concat(itemToStrings(item, gap));
    return [newAcc, gap]; */
  };
  return ['{'].concat(fileDifference.reduce(passThroughTree, [[], '  '])[0], '}').join('\n');
};

export default diffGenerator;
