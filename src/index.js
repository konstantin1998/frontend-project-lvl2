import fs from 'fs';
import path from 'path';

import getDiff from './differenceCreator';
import renderDiff from './formatters';
import parse from './parsers';

const compare = (fileBeforePath, fileAfterPath, outputFormat) => {
  const dotIndex = 1;
  const inputFileType = path.extname(fileAfterPath).slice(dotIndex);

  const objBefore = parse(fs.readFileSync(fileBeforePath).toString(), inputFileType);
  const objAfter = parse(fs.readFileSync(fileAfterPath).toString(), inputFileType);

  const fileDiff = getDiff(objBefore, objAfter);
  return renderDiff(fileDiff, outputFormat);
};

export default compare;
