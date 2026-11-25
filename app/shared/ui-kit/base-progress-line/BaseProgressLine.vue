<script setup lang="ts">
import { computed } from 'vue';
import type { TBaseProgressLineProps } from './types';

const { total, showPercent, completed } = defineProps<TBaseProgressLineProps>();

const percent = computed(() => {
  if (!Number.isFinite(total) || total <= 0 || !Number.isFinite(completed)) {
    return 0;
  }
  if (completed >= total) return 100;
  return Math.min(99, Math.round(Math.max(0, completed) / total * 100));
});
</script>

<template>
  <div
    class="base-progress-line"
  >
    <span
      class="base-progress-line__track"
    >
      <span
        class="base-progress-line__fill"
        :class="{ 'base-progress-line__fill--complete': percent === 100 }"
        :style="{ width: `${percent}%` }"
      />
    </span>
    <span
      v-if="showPercent"
      class="base-progress-line__label text-caption"
    >
      {{ percent }}%
    </span>
  </div>
</template>

<style scoped lang="scss">
.base-progress-line {
  display: flex;
  align-items: center;
  gap: var(--size-xxs-10);

  &__track {
    flex: 1;
    height: 0.25rem;
    border-radius: 999px;
    background-color: var(--color-gray-10);
  }

  &__fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background-color: var(--color-black-1);

    &--complete {
      background-color: var(--color-green-9);
    }
  }

  &__label {
    color: var(--color-gray-6);
    font-variant-numeric: tabular-nums;
  }
}
</style>
