const diffGenerator = (fileDifference, startLine, finishLine, gap) => {
  /* const passThroughTree = (accum, item) => {
    const [acc, gap] = accum;
    switch (item.type) {
      case 'changed': {
        const newAcc = acc.concat([`${gap}- ${item.name}: ${item.valueBefore}`, `${gap}+ ${item.name}: ${item.valueAfter}`]);
        return [newAcc, gap];
      }
      case 'added': {
        const newAcc = acc.concat(`${gap}+ ${item.name}: ${item.value}`);
        return [newAcc, gap];
      }
      case 'deleted': {
        const newAcc = acc.concat(`${gap}- ${item.name}: ${item.value}`);
        return [newAcc, gap];
      }
      case 'unchanged': {
        const newAcc = acc.concat(`${gap}  ${item.name}: ${item.value}`);
        return [newAcc, gap];
      }
      case 'parent': {
        const { children } = item;
        const newAcc = acc.concat(`${gap}  ${item.name}: {`, children.reduce(passThroughTree, [[], `${gap}    `])[0], `${gap}  }`);
        return [newAcc, gap];
      }
      default:
        throw new Error('error');
    }
  };
  return ['{'].concat(fileDifference.reduce(passThroughTree, [[], '  '])[0], '}').join('\n'); */
  const passThroughTree = ()
};

export default diffGenerator;
