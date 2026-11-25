import type { IPersistStorage } from './types';

export class PersistStorage implements IPersistStorage {
  private _storage: Storage;

  constructor() {
    this._storage = window.localStorage;
  }

  get(key: string): unknown {
    const data = this._storage.getItem(key)
    return  data ? JSON.parse(data) : null;
  }

  set(key: string, value: unknown): void {
    this._storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this._storage.removeItem(key);
  }

  clear(): void {
    this._storage.clear();
  }

  setSessionStorageAsMain(): void {
    this._storage = window.sessionStorage;

    window.localStorage.clear();
  }

  setLocalStorageAsMain(): void {
    this._storage = window.localStorage;

    window.sessionStorage.clear();
  }
}
