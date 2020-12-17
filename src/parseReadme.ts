import { readFileSync } from 'fs';

export const parseReadme = (filepath: string, fileNames: string[]) => {
  const readme = readFileSync(filepath, 'utf-8');
  return fileNames.reduce((acc, curr) => {
    const regex = new RegExp(`(\\(${curr}\\))\\|\\s\\|(.*)\\|`);
    const result = regex.exec(readme);

    return { ...acc, [curr]: result ? result[2] : null };
  }, {});
};
