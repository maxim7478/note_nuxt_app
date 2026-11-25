export interface IPersistStorage {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  remove(key: string): void;
  clear(): void;
  setSessionStorageAsMain(): void;
  setLocalStorageAsMain(): void;
}
