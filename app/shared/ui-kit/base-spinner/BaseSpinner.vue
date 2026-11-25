<script setup lang="ts">
import type { TBaseSpinnerProps } from './types';

withDefaults(defineProps<TBaseSpinnerProps>(), {
  width: '1rem',
  height: '1rem',
});
</script>

<template>
  <span
    class="base-spinner"
    role="status"
  />
</template>

<style scoped lang="scss">
.base-spinner {
  display: inline-block;
  box-sizing: border-box;
  width: v-bind(width);
  height: v-bind(height);
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
</style>
