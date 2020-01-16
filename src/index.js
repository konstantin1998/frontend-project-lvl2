import fs from 'fs';
import path from 'path';

import getDiff from './differenceCreator';
import renderDiff from './formatters';
import parse from './parsers';

const extractType = (filePath) => {
  const dotIndex = 1;
  return path.extname(filePath).slice(dotIndex);
};

const compare = (fileBeforePath, fileAfterPath, outputFormat) => {
  const inputFileType = extractType(fileAfterPath);

  const objBefore = parse(fs.readFileSync(fileBeforePath).toString(), inputFileType);
  const objAfter = parse(fs.readFileSync(fileAfterPath).toString(), inputFileType);

  const fileDiff = getDiff(objBefore, objAfter);
  return renderDiff(fileDiff, outputFormat);
};

export default compare;
