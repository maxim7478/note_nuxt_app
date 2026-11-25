export interface INotePoint {
  id: string,
  text: string,
  complete: boolean,
}

export interface INote {
  id: string;
  title: string;
  dateCreated: string;
  dateUpdated: string;
  items: INotePoint[]
}