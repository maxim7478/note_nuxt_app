<script setup lang="ts">
import {useAttrs, type VNode} from 'vue';
import { EBaseIconSize } from '../base-icon';
import type { TBaseCheckboxProps } from './types';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<TBaseCheckboxProps>(), {
  rounded: false,
  disabled: false,
});

const model = defineModel<boolean>({ default: false });

const slots = defineSlots<{
  default?: () => VNode[];
}>();

const attrs = useAttrs()

const handleClick = (event: MouseEvent) => {
  if (props.readonly) {
    event.preventDefault();
  }
}
</script>

<template>
  <label
    class="base-checkbox"
    :class="{
      'base-checkbox--rounded': rounded,
      'base-checkbox--disabled': disabled,
    }"
  >
    <input
      v-model="model"
      v-bind="attrs"
      class="base-checkbox__input"
      type="checkbox"
      :aria-readonly="readonly"
      :disabled="disabled"
      @click="handleClick"
    >
    <span
      class="base-checkbox__control"
    >
      <BaseIcon
        v-if="model"
        name="mdiCheck"
        :size="EBaseIconSize.Small"
      />
    </span>
    <span
      v-if="slots.default || label"
      class="base-checkbox__label"
    >
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<style scoped lang="scss">
.base-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--size-xs-12);
  max-width: 100%;
  color: var(--color-black-1);
  cursor: pointer;

  &__input {
    position: absolute;
    width: 1.125rem;
    height: 1.125rem;
    margin: var(--size-none);
    opacity: 0;
    cursor: inherit;
  }

  &__control {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.125rem;
    height: 1.125rem;
    border: 1px solid var(--color-gray-13);
    border-radius: 0.375rem;
    color: var(--color-white-1);
    background-color: var(--color-white-1);
    transition: background-color 160ms ease-out, border-color 160ms ease-out;
  }

  &__label {
    min-width: 0;
  }

  &--rounded &__control {
    border-radius: 50%;
  }

  &__input:checked + &__control {
    border-color: var(--color-green-9);
    background-color: var(--color-green-9);
  }

  &:hover &__input:not(:disabled) + &__control {
    border-color: var(--color-green-9);
  }

  &__input:focus-visible + &__control {
    outline: 2px solid var(--color-green-9);
    outline-offset: 3px;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
