export enum RecordSortTypes {
  ID = "id",
  Name = "name",
  Data = "data",
}

export interface IRecord {
  id: number;
  name: string;
  data: string;
}
