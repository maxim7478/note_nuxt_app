<script setup lang="ts">
import type { VNode } from 'vue';
import type { TBaseInputProps } from './types';

defineOptions({ inheritAttrs: false });
const props = defineProps<TBaseInputProps>();

const model = defineModel<string | number>();
const slots = defineSlots<{
  label?: () => VNode[];
  'left-icon'?: () => VNode[];
  'right-icon'?: () => VNode[];
}>();

const attrs = useAttrs();
const message = computed(() => props.error || props.hint);
</script>

<template>
  <label class="base-input">
    <span
      v-if="slots.label || label"
      class="base-input__label text-label"
    >
      <slot name="label">{{ label }}</slot>
    </span>
    <span class="base-input__field">
      <span
        v-if="slots['left-icon'] || leftIcon"
        class="base-input__icon"
      >
        <slot name="left-icon">
          <BaseIcon
            v-if="leftIcon"
            :name="leftIcon"
          />
        </slot>
      </span>
      <input
        v-model="model"
        v-bind="attrs"
        class="base-input__control text-body"
        :placeholder="placeholder"
      >
      <span
        v-if="slots['right-icon'] || rightIcon"
        class="base-input__icon"
      >
        <slot name="right-icon">
          <BaseIcon
            v-if="rightIcon"
            :name="rightIcon"
          />
        </slot>
      </span>
    </span>
    <span
      v-if="message"
      class="base-input__hint text-caption"
      :class="{ 'base-input__hint--error': error }"
    >
      {{ message }}
    </span>
  </label>
</template>

<style scoped lang="scss">
.base-input {
  display: flex;
  flex-direction: column;
  gap: var(--size-3xs-8);
  min-width: 0;
  color: var(--color-black-1);

  &__field {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--size-3xs-8);
    padding: var(--size-xs-12) var(--size-md-16);
    border: 1px solid var(--color-gray-11);
    border-radius: 4px;
    background-color: var(--color-gray-1);

    &:focus-within {
      outline: 2px solid var(--color-black-1);
    };

    &:has(input:disabled) {
      opacity: 0.5;
    }
  }

  &__control {
    flex: 1;
    min-width: 0;
    padding: var(--size-none);
    border: 0;
    outline: 0;
    background: transparent;
    color: inherit;
    font: inherit;

    &::placeholder {
      color: var(--color-gray-5);
    }
  }

  &__icon {
    display: inline-flex;
    flex: none;
    color: var(--color-gray-6);
  }

  &__hint {
    color: var(--color-gray-5);

    &--error {
      color: var(--color-red-2);
    }
  }
}
</style>
