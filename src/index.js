import fs from 'fs';
import path from 'path';

import getDifference from './differenceCreator';
import renderDiff from './formatters';
import parse from './parsers';

const compare = (fileBeforePath, fileAfterPath, outputFormat) => {
  const dotIndex = 1;
  const inputFileType = path.extname(fileAfterPath).slice(dotIndex);
  if ((fileBeforePath === undefined) || (fileAfterPath === undefined)) {
    throw new Error('error: one of the file paths is not defined');
  }

  const objBefore = parse(fs.readFileSync(fileBeforePath).toString(), inputFileType);
  const objAfter = parse(fs.readFileSync(fileAfterPath).toString(), inputFileType);

  const fileDifference = getDifference(objBefore, objAfter);
  return renderDiff(fileDifference, outputFormat);
};

export default compare;
