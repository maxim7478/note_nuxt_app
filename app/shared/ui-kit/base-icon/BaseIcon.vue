<script setup lang="ts">
import { EBaseIconSize } from './enums';
import type { TBaseIcon } from './types';

const props = withDefaults(defineProps<TBaseIcon>(), {
  size: EBaseIconSize.Medium,
});

const computedSize = computed(() => {
  switch (props.size) {
    case EBaseIconSize.Medium:
      return `1.125rem`;
    case EBaseIconSize.Large:
      return `1.5rem`;
    case EBaseIconSize.Small:
      return `1rem`;
    default:
      return `1.125rem`;
  }
})
</script>

<template>
  <MdiIcon
    class="base-icon"
    :icon="name"
    :size="computedSize"
  />
</template>

