<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError<{ reason?: string }> }>();

const isMissingNote = computed(() =>
  props.error.status === 404 && props.error.data?.reason === 'note-not-found'
);

const title = computed(() => {
  if (isMissingNote.value) return 'Заметка не найдена';
  if (props.error.status === 404) return 'Страница не найдена';
  return 'Не удалось открыть страницу';
});

useHead(() => ({ title: `${title.value} — todo` }));

const returnToNotes = () => clearError({ redirect: '/notes' });
</script>

<template>
  <main class="error-page">
    <div class="error-page__content">
      <p class="error-page__code">Ошибка {{ error.statusCode }}</p>
      <h1 class="error-page__title text-heading">{{ title }}</h1>
      <p class="error-page__description">
        {{ isMissingNote
          ? 'В списке нет заметки с таким адресом. Возможно, её удалили.'
          : 'Вернитесь к списку, чтобы открыть свои заметки.' }}
      </p>
      <BaseButton
        text="К списку заметок"
        @click="returnToNotes"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.error-page {
  box-sizing: border-box;
  min-height: 100%;
  display: grid;
  place-items: center;
  padding: var(--size-2xl-24);
  background: var(--color-gray-9);
  color: var(--color-black-1);

  &__content {
    width: 100%;
    border-top: 1px solid var(--color-gray-11);
    padding-top: var(--size-2xl-24);
  }

  &__code {
    margin: 0 0 var(--size-md-16);
    color: var(--color-gray-6);
    font-size: var(--font-size-caption);
  }

  &__title {
    margin: 0;
    overflow-wrap: break-word;
  }

  &__description {
    margin: var(--size-md-16) 0 var(--size-3xl-28);
    color: var(--color-gray-6);
    line-height: 1.5;
  }
}
</style>
