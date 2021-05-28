import * as fs from 'fs';
import * as path from 'path';

export function loadData<T>(tableName: string): T {
  const dataDirectory = path.join(process.cwd(), 'data');

  const jsonPath = path.join(dataDirectory, `${tableName}.json`);

  const records: T = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  return records;
}
