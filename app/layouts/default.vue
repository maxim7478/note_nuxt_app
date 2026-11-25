<template>
  <div class="default-layout">
    <MainHeader />
    <div class="default-layout__wrapper">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  &--editor {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  &__wrapper {
    margin: 0 auto;
    max-width: 1280px;
  }
}
</style>
