import { IRecord } from "../models/recordModel";

export default function getRecords(page: number, limit: number): IRecord[] {
  const numRecords = 100;
  let recordSet = new Set<IRecord>();

  for (let i = 0; i < numRecords; i++) {
    recordSet.add({
      id: i,
      name: `name ${numRecords - i}`,
      data: `data ${Math.random()}`,
    });
  }

  //   console.log(...recordSet);
  return Array.from(recordSet);
}
