<script setup lang="ts">
const modalStore = useModalStore();
</script>

<template>
  <teleport to="body">
    <div
      class="dialog-provider"
      :class="{ 'dialog-provider--active':  modalStore.computedModalStack.length }"
    >
      <template
        v-for="(dialog) in modalStore.computedModalStack"
        :key="`dialog-${dialog.id}`"
      >
        <component
          :is="dialog.component"
          :id="dialog.id"
          :config="dialog"
          v-bind="dialog.props"
          v-on="dialog.handlers"
        />
      </template>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.dialog-provider {
  position: fixed;
  top: 0;
  left: 0;

  &--active {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>