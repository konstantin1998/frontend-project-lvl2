import fs from 'fs';
import path from 'path';

import objFormatCompare from './formatters/objDiffGenerator';
import plainFormatCompare from './formatters/plainDiffGenerator';
import jsonFormatCompare from './formatters/jsonDiffGenerator';
import getDifference from './getDifference';

const mapping = {
  plain: plainFormatCompare,
  json: jsonFormatCompare,
  obj: objFormatCompare,
};

const compare = (fileBeforePath, fileAfterPath, format) => {
  const dotIndex = 1;
  const fileBeforeType = path.extname(path.basename(fileBeforePath)).slice(dotIndex);
  const fileAfterType = path.extname(path.basename(fileAfterPath)).slice(dotIndex);

  if ((fileBeforePath === undefined) || (fileAfterPath === undefined)) {
    throw new Error('error: one of the file paths is not defined');
  }
  if (fileBeforeType !== fileAfterType) {
    throw new Error('error: arguments must have the same extansion');
  }
  const fileBeforeContent = fs.readFileSync(fileBeforePath).toString();
  const fileAfterContent = fs.readFileSync(fileAfterPath).toString();

  const fileDifference = getDifference(fileBeforeContent, fileAfterContent, fileAfterType);
  return mapping[format](fileDifference);
};

export default compare;
