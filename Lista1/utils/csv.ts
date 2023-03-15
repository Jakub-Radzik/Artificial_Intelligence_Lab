import { CsvRow } from '../types';
import { getTimeDifference } from './time';

const fs = require('fs');
const csv = require('csv-parser');

export const readCsv = async (path: string) => {
  return new Promise<CsvRow[]>((resolve, reject) => {
    const time = new Date().getTime();
    const data: CsvRow[] = [];

    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (row: CsvRow) => data.push(row))
      .on('end', () => {
        console.log(
          `CSV file successfully processed in ${getTimeDifference(time)} s\n`
        );
        resolve(data);
      })
      .on('error', (error: Error) => reject(error));
  });
};
