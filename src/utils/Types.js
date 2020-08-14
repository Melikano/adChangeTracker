//@flow
export type node<T> = {|
  parent: node<T>,
  leftChild: node<T>,
  rightChild: node<T>,
  key: T,
  data?: Object,
  height: number,
  computeHeight: Function,
|};

export type bst<T> = {|
  root: node<T>,
  insert: Function,
  search: Function,
  traverse: Function,
|};

export type adChange = {|
  id: string,
  name: string,
  title: string,
  field: string,
  date: string,
  new_value: string,
  old_value: string,
|};

export type adField = "name" | "title" | "field" | "date" | "none";

export const toAdFieldType = (fieldStr: string): ?adField => {
  switch (fieldStr) {
    case "name":
      return "name";
    case "title":
      return "title";
    case "field":
      return "field";
    case "date":
      return "date";
    default:
      return null;
  }
};
export type date = {| year: number, month: number, day: number |};
