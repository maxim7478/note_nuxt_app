<script setup lang="ts">
import type { VNode } from 'vue';

const slots = defineSlots<{
  left?: () => VNode[];
  right?: () => VNode[];
}>();
</script>

<template>
  <div class="base-section-item">
    <div
      v-if="slots.left"
      class="base-section-item__left"
    >
      <slot name="left" />
    </div>
    <div
      v-if="slots.right"
      class="base-section-item__right"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-section-item {
  display: flex;
  align-items: center;
  gap: var(--size-md-16);
  padding: var(--size-xs-12) var(--size-md-16);
  border: 1px solid var(--color-gray-10);
  border-radius: var(--size-sm-14);
  background-color: var(--color-white-1);

  &__left {
    flex: 1;
    min-width: 0;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: var(--size-3xs-8);
  }
}
</style>
