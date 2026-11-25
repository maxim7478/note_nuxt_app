<script setup lang="ts">
import {EBaseButtonMode, EBaseButtonSize, EBaseButtonTheme} from './enums';
import type { TBaseButtonProps } from './types';

const props = withDefaults(defineProps<TBaseButtonProps>(), {
  type: 'button',
  mode: EBaseButtonMode.Default,
  theme: EBaseButtonTheme.Primary,
  size: EBaseButtonSize.Medium,
  rounded: false,
});

const buttonTheme = computed(() => props.theme ?? (
  props.mode === EBaseButtonMode.Text ? 'primary' : props.mode
));

const slots = defineSlots<{
  'left-icon'?: unknown,
  'right-icon'?: unknown,
  'default'?: unknown,
}>();
</script>

<template>
  <button
    class="base-button text-body"
    :class="[
      `base-button--theme-${buttonTheme}`,
      `base-button--${size}`,
      { 'base-button--rounded': rounded, 'base-button--text': mode === EBaseButtonMode.Text },
    ]"
    :type="type"
    :disabled="disabled"
  >
    <slot
      v-if="slots['left-icon'] || leftIcon"
      name="left-icon"
    >
      <BaseIcon
        v-if="leftIcon"
        :name="leftIcon"
      />
    </slot>
    <span
      v-if="slots.default || text?.length"
      class="base-button__content"
    >
      <slot>{{text}}</slot>
    </span>
    <slot
      v-if="slots['right-icon'] || rightIcon"
      name="right-icon"
    >
      <BaseIcon
        v-if="rightIcon"
        :name="rightIcon"
      />
    </slot>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  --button-current: var(--button-color);

  color: var(--button-label, var(--color-white-1));
  background-color: var(--button-current);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--size-3xs-8);
  border: 0;
  height: min-content;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 160ms ease-out, color 160ms ease-out;

  &--rounded {
    border-radius: 100px;
  }

  &--small {
    padding: var(--size-3xs-8) var(--size-xs-12);
  }

  &--medium {
    padding: var(--size-xxs-10) var(--size-lg-18);
  }

  &--large {
    padding: var(--size-xs-12) var(--size-2xl-24);
  }

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
  }

  &--theme-primary {
    --button-color: var(--color-black-1);
    --button-hover: var(--color-gray-12);
    --button-active: var(--color-black-2);
  }

  &--theme-secondary {
    --button-color: var(--color-green-2);
    --button-hover: var(--color-green-7);
    --button-active: var(--color-green-8);
    --button-label: var(--color-green-3);
  }

  &--theme-danger {
    --button-color: var(--color-red-2);
    --button-hover: var(--color-red-3);
    --button-active: var(--color-red-4);
  }

  &:hover:not(:disabled) {
    --button-current: var(--button-hover);
  }

  &:active:not(:disabled) {
    --button-current: var(--button-active);
  }

  &--text {
    color: var(--button-current);
    background-color: transparent;
  }

  &:focus-visible {
    outline: 2px solid var(--color-black-1);
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--theme-danger:focus-visible {
    outline-color: var(--color-red-2);
  }
}
</style>
