<script setup lang="ts">
import { computed } from 'vue';
import { EBaseBadgeMode } from '~/shared/ui-kit/base-badge/enums';
import {EBaseButtonMode, EBaseButtonSize, EBaseButtonTheme} from '~/shared/ui-kit/base-button/enums';
import type { TNoteCardProps } from './types';
import {useIsMobile} from "~/shared/composables/useIsMobile";
import {useNotesListStore} from "~/entities";

const props = withDefaults(defineProps<TNoteCardProps>(), {
  previewLimit: 4
});

const emit = defineEmits<{
  (event: 'remove', value: string): void
}>()

const isMobile = useIsMobile()

const visibleItems = computed(() => props.items.slice(0, props.previewLimit));

const total = computed(() => props.items.length);

const completed = computed(() => props.items.filter(item => item.complete).length);

const isCompleted = computed(() => total.value > 0 && completed.value === total.value);

const moreLabel = computed(() => {
  const count = total.value - visibleItems.value.length;
  if (!count) return '';
  return `+ ещё ${count}`;
});

const handleToEdit = () => {
  navigateTo({ name: NOTES_EDIT_PAGE, params: { id: props.id } });
}

const handleRemoveItem = () => {
  emit('remove', props.id);
}
</script>

<template>
  <BaseCard
    class="note-card"
    :class="{ 'note-card--complete': isCompleted }"
  >
    <template #header>
      <div class="note-card__header">
        <h2 class="note-card__title text-subhead">
          {{ title }}
        </h2>
        <div class="note-card__actions">
          <BaseButton
            left-icon="mdiPencilOutline"
            :mode="EBaseButtonMode.Text"
            :size="EBaseButtonSize.Small"
            @click="handleToEdit"
          />
          <BaseButton
            left-icon="mdiTrashCanOutline"
            :theme="EBaseButtonTheme.Danger"
            :mode="EBaseButtonMode.Text"
            :size="EBaseButtonSize.Small"
            @click="handleRemoveItem"
          />
          <BaseBadge
            :mode="isCompleted ? EBaseBadgeMode.success : EBaseBadgeMode.secondary"
            :icon="isCompleted ? 'mdiCheck' : undefined"
            :label="isCompleted ? 'Готово' : `${completed}/${total}`"
          />
        </div>
      </div>
    </template>
    <template #content>
      <ul
        v-if="visibleItems.length"
        class="note-card__items"
      >
        <li
          v-for="item in visibleItems"
          :key="item.id"
        >
          <BaseCheckbox
            rounded
            readonly
            :model-value="item.complete"
          >
            <span :class="{ 'note-card__text--complete': item.complete }">
              {{ item.text }}
            </span>
          </BaseCheckbox>
        </li>
      </ul>
      <span
        v-if="moreLabel.length"
        class="note-card__more text-caption"
      >
        {{ moreLabel }}
      </span>
    </template>
    <template #footer>
      <BaseProgressLine
        :show-percent="!isMobile"
        :completed="completed"
        :total="total"
      />
    </template>
  </BaseCard>
</template>

<style scoped lang="scss">
.note-card {
  min-height: 14.5rem;

  &.note-card--complete {
    background-color: var(--color-green-1);
    border-color: var(--color-green-8);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--size-3xs-8);
  }

  &__title {
    font-weight: var(--font-weight-bold);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--size-3xs-8);
  }

  &__items {
    display: grid;
    gap: var(--size-3xs-8);
    margin: var(--size-none);
    padding: var(--size-none);
    list-style: none;
  }

  &__text--complete {
    color: var(--color-gray-5);
    text-decoration: line-through;
  }

  &__more {
    display: block;
    margin-block-start: var(--size-xs-12);
    margin-inline-start: calc(var(--size-lg-18) + var(--size-xs-12));
    color: var(--color-gray-5);
  }
}
</style>
