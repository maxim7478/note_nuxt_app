<script setup lang="ts">
import type { TBaseBreadcrumbsProps } from './types';

defineProps<TBaseBreadcrumbsProps>();
</script>

<template>
  <nav class="base-breadcrumbs">
    <ol class="base-breadcrumbs__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="base-breadcrumbs__item"
      >
        <span
          v-if="index > 0"
          class="base-breadcrumbs__separator"
          aria-hidden="true"
        >
          /
        </span>
        <NuxtLink
          v-if="item.to && !item.disabled"
          class="base-breadcrumbs__link"
          :to="item.to"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else>{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
.base-breadcrumbs {
  &__list,
  &__item {
    display: flex;
    align-items: baseline;
    gap: var(--size-3xs-8);
  }

  &__list {
    flex-wrap: wrap;
    margin: var(--size-none);
    padding: var(--size-none);
    list-style: none;
  }

  &__item {
    min-width: 0;
    overflow-wrap: anywhere;
    color: var(--color-black-1);
  }

  &__link,
  &__separator {
    color: var(--color-gray-6);
  }

  &__link {
    text-underline-offset: 0.15em;

    &:hover {
      color: var(--color-black-1);
    }
  }
}
</style>
