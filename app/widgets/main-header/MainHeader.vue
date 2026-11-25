<script setup lang="ts">
import {AppLogo, NOTE_NEW_PAGE, useIsMobile} from "~/shared";

const isMobile = useIsMobile()

const handleNewTask = () => {
  navigateTo({
    name: NOTE_NEW_PAGE,
  })
}

const computedBtnText = computed(() => isMobile.value ? '' : 'Новая заметка')
</script>

<template>
  <header class="main-header">
    <div class="main-header__inner">
      <AppLogo />

      <BaseButton
        type="button"
        left-icon="mdiPlus"
        :text="computedBtnText"
        @click="handleNewTask"
      />
    </div>
  </header>
</template>

<style scoped lang="scss">
.main-header {
  color: var(--color-black-1);
  border-bottom: 1px solid var(--color-gray-10);

  &__inner {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    gap: var(--size-2xl-24);
    max-width: 1280px;
    margin-inline: auto;
    padding: var(--size-md-16) var(--size-2xl-24);
    align-items: center;
  }

  &__left {
    display: flex;
    align-items: center;
  }
}
</style>
