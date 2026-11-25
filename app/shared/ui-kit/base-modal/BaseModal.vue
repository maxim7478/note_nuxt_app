<script setup lang="ts">
import { EBaseButtonMode, EBaseButtonSize } from '../base-button/enums';
import type {TProps} from "~/shared/ui-kit/base-modal/types.ts";

const slots = defineSlots<{
  header?: unknown;
  content?: unknown;
  footer?: unknown;
}>();

defineProps<TProps>()

const modalStore = useModalStore()

const dialogTemplate = useTemplateRef('dialog')

const handleClose = () => {
  modalStore.removeFromModalStack()
}

onMounted(() => {
  dialogTemplate.value?.showModal()
})

</script>

<template>
  <dialog
    ref="dialog"
    class="base-modal"
    @close="handleClose"
  >
    <BaseButton
      class="base-modal__close"
      left-icon="mdiClose"
      :mode="EBaseButtonMode.Text"
      :size="EBaseButtonSize.Small"
      @click="handleClose"
    />
    <div
      v-if="slots.header || title"
      class="base-modal__header"
    >
      <slot name="header" >
        <h2
          v-if="title"
          class="base-modal__title text-heading"
        >
          {{ title }}
        </h2>
      </slot>
    </div>

    <div
      v-if="slots.content || text"
      class="base-modal__content"
    >
      <slot name="content">
        {{ text }}
      </slot>
    </div>
    <footer
      v-if="slots.footer"
      class="base-modal__footer"
    >
      <slot name="footer" />
    </footer>
  </dialog>
</template>

<style scoped lang="scss">
.base-modal {
  box-sizing: border-box;
  width: min(30rem, calc(100% - 2 * var(--size-md-16)));
  max-height: calc(100dvh - 2 * var(--size-md-16));
  padding: var(--size-2xl-24);
  overflow: auto;
  overflow-wrap: anywhere;
  border: 1px solid var(--color-gray-10);
  border-radius: 1.25rem;
  background-color: var(--color-white-1);
  color: var(--color-black-1);

  &__close {
    position: absolute;
    top: var(--size-xs-12);
    right: var(--size-xs-12);
  }

  &__close + * {
    padding-inline-end: var(--size-5xl-40);
  }

  &__header + &__content {
    margin-block-start: var(--size-xs-12);
  }

  &__header + &__footer,
  &__content + &__footer {
    margin-block-start: var(--size-2xl-24);
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--size-3xs-8);
  }
}
</style>
