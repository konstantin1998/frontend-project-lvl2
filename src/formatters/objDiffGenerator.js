const iter = (fileDifference, level = 0) => {
  const gap = '  '.repeat(2 * level + 1);
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
        const startLine = `${gap}  ${item.name}: {`;
        const finishLine = `${gap}  }`;
        return [startLine, iter(item.children, level + 1), finishLine].join('\n');
      }
      default:
        throw new Error('exeption in  function iter from objDiffGenerator.js');
    }
  };
  if (level === 0) {
    return ['{', ...fileDifference.map(passThroughTree), '}'].join('\n');
  }
  return fileDifference.map(passThroughTree).join('\n');
};

const generateDiff = fileDifference => iter(fileDifference);

export default generateDiff;
