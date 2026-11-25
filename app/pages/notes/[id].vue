<script setup lang="ts">
import {useNoteStore, useNotesListStore} from "~/entities";

const route = useRoute()
const noteStore = useNoteStore()
const notesListStore = useNotesListStore()

const getData = () => {
  try {
    const id = route.params.id
    if (!id) { throw new Error('Неверный ID') }
    noteStore.getData(id as string)
  } catch (err) {
    console.log(err)
    throw createError({
      status: 404,
      statusMessage: 'Note not found',
      data: { reason: 'note-not-found' },
      fatal: true,
    })
  }
}

getData()

const handleStorage = (event: StorageEvent) => {
  if (event.storageArea !== window.localStorage) return
  if (event.key !== 'notesList' && event.key !== null) return

  const id = route.params.id
  if (typeof id === 'string') notesListStore.checkNoteExists(id)
}

onMounted(() => {
  window.addEventListener('storage', handleStorage)
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', handleStorage)
  noteStore.clearNoteData()
})
</script>

<template>
  <NoteForm :item="noteStore.noteItem" />
</template>

<style scoped>

</style>
