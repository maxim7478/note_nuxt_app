<script setup lang="ts">

const slots = defineSlots<{
  header?: unknown;
  content?: unknown;
  footer?: unknown;
}>();
</script>

<template>
  <div
    class="base-card"
  >
    <div
      v-if="slots?.header"
      class="base-card__header"
    >
      <slot
        name="header"
      />
    </div>
    <div
      v-if="slots?.content"
      class="base-card__content"
    >
      <slot
        name="content"
      />
    </div>
    <div
      v-if="slots?.footer"
      class="base-card__footer"
    >
      <slot
        name="footer"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--size-md-16);
  min-width: 0;
  padding: var(--size-xl-20);
  border: 1px solid var(--color-gray-10);
  border-radius: 1.25rem;
  color: var(--color-black-1);
  background-color: var(--color-white-1);

  &__header,
  &__content,
  &__footer {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  &__content {
    flex-grow: 1;
  }

  &__footer {
    margin-top: auto;
  }
}
</style>
