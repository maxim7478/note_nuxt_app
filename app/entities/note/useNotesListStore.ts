import type {INote} from "~/entities/note/types.ts";
import { usePersistStorageStore } from "~/shared/stores/persist-storage-store";
import {generateId, copyObject} from "~/shared";

export const useNotesListStore = defineStore('notesListStore', () => {
  const { storage } = usePersistStorageStore()

  const listNotes = ref<INote[]>([])

  const getNoteList = () => {
    const list = storage.get('notesList')

    if (list && Array.isArray(list)) {
      listNotes.value = list
    }
  }

  const init = () => {
    getNoteList()
    console.log('asd')
  }

  const saveToStorage = () => {
    storage.set('notesList', listNotes.value)
  }

  const addNewItem = (note: Omit<INote, 'id' | 'dateCreated' | 'dateUpdated'>) => {
    const item = {
      ...note,
      id: generateId(),
      dateCreated: new Date().toString(),
      dateUpdated: new Date().toString(),
      items: copyObject(note.items),
    }
    listNotes.value.push(item)

    saveToStorage()

    return item.id
  }

  const removeItem = (id: string) => {
    listNotes.value = listNotes.value.filter((item: INote) => item.id !== id)

    saveToStorage()
  }

  const updateNoteItem = (note: INote) => {
    const item = listNotes.value.find((item: INote) => item.id === note.id)
    if (!item) return

    item.title = note.title
    item.dateUpdated = new Date().toString()
    item.items = [...note.items]

    saveToStorage()
  }

  const clearAll = () => {
    listNotes.value = []

    saveToStorage()
  }

  const getItemById = (id: string) => {
    const item = listNotes.value.find((item: INote) => item.id === id)
    if (!item) {
      throw new Error('Not found')
    }
    return item
  }

  init()

  return {
    listNotes,
    getItemById,
    addNewItem,
    removeItem,
    getNoteList,
    updateNoteItem,
    clearAll,
  }
})