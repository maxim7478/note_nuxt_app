<script setup lang="ts">

</script>

<template>
  <NuxtLink
    to="/"
    class="app-logo"
  >
    <span
      class="app-logo__mark"
    >
      <BaseIcon
        name="mdiCheck"
      />
    </span>
    <span
      class="app-logo__wordmark"
    >
      todo
    </span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.app-logo {
  display: inline-flex;
  gap: var(--size-xxs-10);
  color: inherit;
  text-decoration: none;
  border-radius: 4px;

  &:focus-visible {
    outline: 2px solid var(--color-black-1);
    outline-offset: 5px;
  }

  &__mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    color: var(--color-white-1);
    background-color: var(--color-black-1);
    border-radius: 0.5rem;
  }

  &__wordmark {
    font-family: ui-rounded, "Arial Rounded MT Bold", -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 1.75rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
  }
}
</style>