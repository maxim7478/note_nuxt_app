import {cloneDeep} from "lodash-es";

export const copyObject = <T>(value: T): T => {
  return cloneDeep(value);
}