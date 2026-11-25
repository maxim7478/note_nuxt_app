<template>
  <div class="base-sections">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.base-sections {
  display: flex;
  flex-direction: column;
  gap: var(--size-3xs-8);
}
</style>
