const generateDiff = (fileDifference, startLine = '{', finishLine = '}', gap = '  ') => {
  const passThroughTree = (item) => {
    switch (item.type) {
      case 'changed': {
        return [`${gap}- ${item.name}: ${item.valueBefore}`, `${gap}+ ${item.name}: ${item.valueAfter}`].join('\n');
      }
      case 'added': {
        return `${gap}+ ${item.name}: ${item.value}`;
      }
      case 'deleted': {
        return `${gap}- ${item.name}: ${item.value}`;
      }
      case 'unchanged': {
        return `${gap}  ${item.name}: ${item.value}`;
      }
      case 'parent': {
        const newStartLine = `${gap}  ${item.name}: {`;
        const newFinishLine = `${gap}  }`;
        const newGap = `${gap}    `;
        return generateDiff(item.children, newStartLine, newFinishLine, newGap);
      }
      default:
        throw new Error('error');
    }
  };
  return [startLine, ...fileDifference.map(passThroughTree), finishLine].join('\n');
};

export default generateDiff;
