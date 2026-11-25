import type {TNullable} from "~/shared/types";
import type {INote} from "~/entities/note/types.ts";
import {useNotesListStore} from "~/entities";
import {copyObject} from "~/shared";

export const useNoteStore = defineStore('noteStore', () => {
  const notesListStore = useNotesListStore()

  const noteItem = ref<TNullable<INote>>(null)

  const getData = (id: string) => {
    const item = notesListStore.getItemById(id)
    noteItem.value = copyObject(item)
  }

  const updateNote = (data: Omit<INote, 'dateUpdated' | 'dateCreated'>) => {
    if (!noteItem.value) return;
    noteItem.value.id = data.id;
    noteItem.value.title = data.title;
    noteItem.value.dateUpdated = new Date().toString();
    noteItem.value.items = [...data.items];

    saveNote()
  }

  const saveNote =  () => {
    if (!noteItem.value) return;
    notesListStore.updateNoteItem(noteItem.value)
  }

  const removeNote = (id: string) => {
    if (!noteItem.value) return;
    notesListStore.removeItem(id)
  }

  const createNote = (data: Omit<INote, 'id' | 'dateCreated' | 'dateUpdated'>) => {
    return notesListStore.addNewItem(data)
  }

  const clearNoteData = () => {
    noteItem.value = null
  }

  return {
    getData,
    createNote,
    updateNote,
    removeNote,
    clearNoteData,
    noteItem,
  };
})