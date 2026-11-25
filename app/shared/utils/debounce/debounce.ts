import { debounce } from 'lodash-es';

export function debounceFunc<T extends unknown[], U>(
  callback: (...args: T) => U,
  delay: number,
) {
  return debounce(callback, delay);
}