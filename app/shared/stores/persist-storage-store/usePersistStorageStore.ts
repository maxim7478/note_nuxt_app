import { PersistStorage } from "~~/infrustructure/persist-storage";

export const usePersistStorageStore = defineStore('persistStorageStore', () => {
  const storage = new PersistStorage()

  return {
    storage,
  }
})