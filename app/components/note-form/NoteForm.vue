<script setup lang="ts">
import zod from "zod";
import {
  EBaseButtonMode,
  EBaseButtonTheme,
  EBaseButtonSize,
  NOTES_EDIT_PAGE,
  NOTES_PAGE,
  ModalConfirm,
  useHistory,
  copyObject,
  useUndoRedo,
  useIsMobile,
  generateId
} from "~/shared";
import type {INote, INotePoint} from "~/entities";
import {useNoteStore, useNotesListStore} from '~/entities'

type TNoteDraft = Pick<INote, 'items' | 'title'> & {
  versionSchema: number;
  id: string | null;
}

type TNoteStep =
    | { field: 'title'; before: string; after: string }
    | { field: 'complete'; id: string; before: boolean; after: boolean }
    | { field: 'add'; item: INotePoint; index: number }
    | { field: 'remove'; item: INotePoint; index: number }

const props = defineProps<{
  item?: TNullable<INote>
}>()

const route = useRoute()

const noteStore = useNoteStore()
const notesListStore = useNotesListStore()
const modalStore = useModalStore()
const { storage } = usePersistStorageStore()
const isMobile = useIsMobile()

const DRAFT_SCHEMA_VERSION = 1
const DRAFT_STORAGE_KEY = 'note-draft'

const newPointForm = ref({
  name: ''
})
const titleForm = ref({
  title: ''
})
const isFormChanged = ref(false);
const loading = ref(false);
const points = ref<INotePoint[]>([]);
const listDrafts = ref<TNoteDraft[]>([])

const formTemplate = useTemplateRef('titleForm')

const completed = computed(() => points.value.filter(item => item.complete).length);

const isNew = computed(() => !props.item && route.name === 'notes-new');

const breadCrumbsItems = computed(() => [
  { label: 'Заметки', to: { name: NOTES_PAGE } },
  { label: isNew.value ? 'Новая заметка' : titleForm.value.title || 'Заметка' },
])

const computedBtnText = computed(() => isMobile.value ? '' : 'Добавить')

const rulesOfPoint = computed(() => {
  return zod.object({
    name: zod
        .string()
        .min(1, 'Введите текст'),
  })
});

const rulesOfTitle = computed(() => {
  return zod.object({
    title: zod
        .string()
        .min(1, 'Введите текст'),
  })
});

const initData = () => {
  if (isNew.value || !props.item) return

  titleForm.value.title = props.item.title;

  points.value = [...props.item.items]
}

initData()

const checkDraft = () => {
  const draft = storage.get(DRAFT_STORAGE_KEY) as TNoteDraft
  const draftId = props.item?.id ?? null
  if (
      draft &&
      draft.id === draftId &&
      draft.versionSchema === DRAFT_SCHEMA_VERSION &&
      typeof draft.title === 'string' &&
      Array.isArray(draft.items)
  ) {
    askResetDraft(draft)
  }
}

const askResetDraft = (draft: TNoteDraft) => {
  modalStore.addModalToStack({
    component: ModalConfirm,
    props: {
      confirmLabel: 'Восстановить',
      text: 'Есть черновик заметки, восстановить?',
      title: 'Подтверждение'
    },
    handlers: {
      confirm: () => {
        titleForm.value.title = draft.title
        points.value = [...draft.items]
      }
    }
  })
}

const updateNoteItem = async () => {
  try {
    const valid = await formTemplate.value?.validate();
    if (!noteStore.noteItem || isNew.value || !valid) return
    if (!notesListStore.checkNoteExists(noteStore.noteItem.id)) return
    loading.value = true;
    const payload = {
      id: noteStore.noteItem.id,
      title: titleForm.value.title,
      items: [...points.value],
    }
    noteStore.updateNote(payload)
    history.reset()
    storage.remove(DRAFT_STORAGE_KEY)
  } catch (err) {
    console.error(err);
  } finally {
    // Имитация запроса
    setTimeout(() => {
      loading.value = false;
    }, 1000)
  }
}


const addItem = () => {
  const text = newPointForm.value.name.trim()
  if (!text) return

  const item: INotePoint = {
    id: generateId(),
    text,
    complete: false
  }
  const index = points.value.length

  points.value.push(item)
  newPointForm.value.name = ''
  history.record({ field: 'add', item: { ...item }, index })
}

const removeItem = (id: string) => {
  const index = points.value.findIndex(point => point.id === id)
  if (index === -1) return

  const item = { ...points.value[index]! }

  points.value.splice(index, 1)
  history.record({ field: 'remove', item, index })

}

const deleteNote = () => {
  try {
    if (isNew.value || !noteStore.noteItem) return
    noteStore.removeNote(noteStore.noteItem.id)
    noteStore.clearNoteData()
    navigateTo({ name: NOTES_PAGE })
  } catch (err) {
    console.error(err);
  }
}

const handleDeleteItem = () => {
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
        deleteNote()
      }
    }
  })
}

const createNote = async () => {
  try {
    const valid = await formTemplate.value?.validate();
    if (!valid) return;
    const payload = {
      title: titleForm.value.title,
      items: [...points.value],
    }
    const id = noteStore.createNote(payload)
    storage.remove(DRAFT_STORAGE_KEY)
    history.reset()
    navigateTo({ name: NOTES_EDIT_PAGE, params: { id } })
  } catch (err) {
    console.error(err);
  }
}

const handleSave = () => {
  if (isNew.value || !props.item) {
    createNote()
  } else {
    updateNoteItem()
  }
}

const updateDraft = () => {
  const draft = {
    versionSchema: DRAFT_SCHEMA_VERSION,
    id: noteStore.noteItem?.id ?? null,
    title: titleForm.value.title,
    items: copyObject(points.value),
  }
  if (listDrafts.value.length > 50) {
    listDrafts.value.splice(0, 1)
  }
  listDrafts.value.push(draft)

  saveLastDraft(draft)
};

const saveLastDraft = (draft: TNoteDraft) => {
  storage.set(DRAFT_STORAGE_KEY, draft)
}

const updateDraftData = debounceFunc(updateDraft, 300)

const history = useHistory<TNoteStep>({
  apply: (step, direction) => {
    const key = direction === 'undo' ? 'before' : 'after'

    switch (step.field) {
      case 'title':
        titleForm.value.title = step[key]
        break

      case 'complete': {
        const point = points.value.find(item => item.id === step.id)
        if (point) point.complete = step[key]
        break
      }
      case 'add': {
        if (direction === 'undo') {
          points.value = points.value.filter(point => point.id !== step.item.id)
        } else {
          points.value.splice(step.index, 0, { ...step.item })
        }
        break
      }
      case 'remove': {
        if (direction === 'undo') {
          points.value.splice(step.index, 0, { ...step.item })
        } else {
          points.value = points.value.filter(point => point.id !== step.item.id)
        }
        break
      }
    }
  },

  onChange: updateDraft,
})

const togglePoint = (point: INotePoint, after: boolean) => {
  const before = point.complete
  if (before === after) return

  point.complete = after
  history.record({ field: 'complete', id: point.id, before, after })
}

let titleBeforeEdit = ''

const handleTitleFocus = () => {
  titleBeforeEdit = titleForm.value.title
}

const handleTitleBlur = () => {
  const after = titleForm.value.title
  if (after === titleBeforeEdit) return

  history.record({ field: 'title', before: titleBeforeEdit, after })
}

const handleCancel = () => {
  if (!isFormChanged.value) {
    navigateTo({ name: NOTES_PAGE })
  } else {
    modalStore.addModalToStack({
      component: ModalConfirm,
      props: {
        confirmTheme: EBaseButtonTheme.Danger,
        confirmLabel: 'Подтвердить',
        text: 'Вы уверены что хотите отменить изменения?',
        title: 'Подтверждение'
      },
      handlers: {
        confirm: () => {
          navigateTo({ name: NOTES_PAGE })
          storage.remove(DRAFT_STORAGE_KEY)
        }
      }
    })
  }

}

useUndoRedo({ undo: history.undo, redo: history.redo })

watch([titleForm, points], () => {
  isFormChanged.value = true
  updateDraftData()
}, {
  deep: true,
})

onMounted(() => {
  checkDraft()
})
</script>

<template>
  <main class="note-create">
    <div class="note-create__navigation">
      <BaseBreadcrumbs :items="breadCrumbsItems"/>
      <BaseSpinner v-if="loading" />
    </div>
    <BaseForm
      ref="titleForm"
      id-form="titleForm"
      :model="titleForm"
      :schema="rulesOfTitle"
    >
      <BaseFormItem name="title">
        <template #default="{ error, onBlur }">
          <BaseInput
            v-model="titleForm.title"
            label="Заголовок"
            name="title"
            placeholder="Название заметки"
            :error="error"
            @focus="handleTitleFocus"
            @blur="handleTitleBlur(); onBlur()"
          />
        </template>
      </BaseFormItem>
    </BaseForm>
    <BaseForm
      id-form="newPointForm"
      class="note-create__add"
      :model="newPointForm"
      :schema="rulesOfPoint"
      @submit="addItem"
    >
      <BaseFormItem name="name">
        <template #default="{ error, onBlur }">
          <BaseInput
            v-model="newPointForm.name"
            placeholder="Новый пункт…"
            :error="error"
            @blur="onBlur"
          />
        </template>
      </BaseFormItem>
      <BaseButton
        type="submit"
        left-icon="mdiPlus"
        :text="computedBtnText"
        :size="EBaseButtonSize.Large"
        :disabled="!newPointForm.name.trim()"
      />
    </BaseForm>
    <div class="note-create__progress">
      <BaseProgressLine
        :completed="completed"
        :total="points.length"
      />
      <span class="text-caption">{{ completed }} из {{ points.length }} выполнено</span>
    </div>
    <BaseSections v-if="points.length">
      <BaseSectionItem
        v-for="point in points"
        :key="point.id"
      >
        <template #left>
          <BaseCheckbox
            :model-value="point.complete"
            @update:model-value="togglePoint(point, $event)"
          >
            <span :class="{ 'note-create__item--complete': point.complete }">
              {{ point.text }}
            </span>
          </BaseCheckbox>
        </template>
        <template #right>
          <BaseButton
            left-icon="mdiTrashCanOutline"
            :theme="EBaseButtonTheme.Danger"
            :mode="EBaseButtonMode.Text"
            :size="EBaseButtonSize.Small"
            @click="removeItem(point.id)"
          />
        </template>
      </BaseSectionItem>
    </BaseSections>
    <div class="note-create__actions">
      <BaseButton
        :theme="EBaseButtonTheme.Secondary"
        @click="handleCancel"
      >
        Отменить
      </BaseButton>
      <BaseButton
        v-if="!isNew"
        :theme="EBaseButtonTheme.Danger"
        @click="handleDeleteItem"
      >
        Удалить
      </BaseButton>
      <BaseButton @click="handleSave" >
        Сохранить
      </BaseButton>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use "~/assets/styles/media-queries-mixin" as media;

.note-create {
  box-sizing: border-box;
  width: 100%;
  max-width: 56rem;
  margin-inline: auto;
  padding: var(--size-5xl-40) var(--size-2xl-24);
  display: flex;
  flex-direction: column;
  gap: var(--size-2xl-24);
  overflow-wrap: anywhere;

  &__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--size-xs-12);
  }

  &__progress,
  &__add {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--size-xs-12);
  }

  &__progress {
    align-items: center;
    color: var(--color-gray-6);
  }

  &__item--complete {
    color: var(--color-gray-5);
    text-decoration: line-through;
  }

  &__actions {
    display: flex;
    justify-content: right;
    gap: var(--size-md-16);
  }
}
</style>
