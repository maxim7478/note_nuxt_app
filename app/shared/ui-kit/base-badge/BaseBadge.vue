<script setup lang="ts">
import { EBaseIconSize } from '../base-icon/enums';
import { EBaseBadgeMode } from './enums';
import type { TBaseBadgeProps } from './types';

withDefaults(defineProps<TBaseBadgeProps>(), {
  mode: EBaseBadgeMode.primary,
});

const slots = defineSlots<{
  icon?: unknown;
  label?: unknown;
}>();
</script>

<template>
  <span
    class="base-badge text-caption"
    :class="`base-badge--${mode}`"
  >
    <slot
      v-if="slots.icon || icon"
      name="icon"
    >
      <BaseIcon
        v-if="icon"
        :name="icon"
        :size="EBaseIconSize.Small"
      />
    </slot>
    <slot
      v-if="slots.label || label"
      name="label"
    >
      {{ label }}
    </slot>
  </span>
</template>

<style scoped lang="scss">
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--size-5xs-4);
  padding: var(--size-5xs-4) var(--size-xxs-10);
  border-radius: 999px;
  white-space: nowrap;

  &--primary {
    color: var(--color-white-1);
    background-color: var(--color-black-1);
  }

  &--secondary {
    color: var(--color-gray-12);
    background-color: var(--color-gray-14);
  }

  &--success {
    color: var(--color-green-9);
    background-color: var(--color-green-10);
  }

  &--danger {
    color: var(--color-red-2);
    background-color: var(--color-red-1);
  }
}
</style>
