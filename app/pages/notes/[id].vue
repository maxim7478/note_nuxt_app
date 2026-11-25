<script setup lang="ts">
import {useNoteStore} from "~/entities";

const route = useRoute()
const noteStore = useNoteStore()

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

onBeforeUnmount(() => {
  noteStore.clearNoteData()
})
</script>

<template>
  <NoteForm :item="noteStore.noteItem" />
</template>

<style scoped>

</style>
