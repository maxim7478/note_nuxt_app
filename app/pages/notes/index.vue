<script lang="ts" setup>
import {type INote, useNotesListStore} from "~/entities";
import {EBaseButtonTheme, ModalConfirm, copyObject} from "~/shared";

const notesListStore = useNotesListStore()
const modalStore = useModalStore()

const search = ref<string>('')

const noteList = ref<INote[]>([])

const getNotesList = () => {
  if (search.value.length === 0) {
    noteList.value = copyObject(notesListStore.listNotes)
  } else {
    noteList.value = notesListStore.listNotes.filter((note) => note.title.includes(search.value.trim()))
  }
}

getNotesList()

const deleteNote = (id: string) => {
  notesListStore.removeItem(id);
  getNotesList()
}

const handleDeleteItem = (id: string) => {
  modalStore.addModalToStack({
    component: ModalConfirm,
    props: {
      confirmTheme: EBaseButtonTheme.Danger,
      confirmLabel: 'Удалить',
      text: 'Вы уверены что хотите удалить заметку?',
      title: 'Подтверждение'
    },
    handlers: {
      confirm: () => {
        deleteNote(id)
      }
    }
  })
}

const searchData = debounceFunc(getNotesList, 300)
</script>

<template>
  <div class="notes-page">
    <div class="notes-page__search">
      <BaseInput
        v-model="search"
        label="Поиск"
        placeholder="Введите название"
        right-icon="mdiMagnify"
        name="item"
        @input="searchData"
      />
    </div>
    <div class="notes-page__items">
      <NoteCard
        v-for="note in noteList"
        :key="note.id"
        :id="note.id"
        :title="note.title"
        :items="note.items"
        @remove="handleDeleteItem"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/styles/media-queries-mixin";

.notes-page {
  &__search {
    padding: var(--size-5xl-40) var(--size-2xl-24) var(--size-none) var(--size-2xl-24);
  }

  &__items {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
    gap: var(--size-xl-20);
    box-sizing: border-box;
    margin-inline: auto;
    padding: var(--size-5xl-40) var(--size-2xl-24);
  }

  @include media-queries-mixin.mq("mobile", only) {
    &__items {
      grid-template-columns: 1fr;
    }
  }

  @include media-queries-mixin.mq("tablet", only) {
    &__items {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}
</style>
