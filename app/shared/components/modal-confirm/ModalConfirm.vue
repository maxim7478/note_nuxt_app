<script setup lang="ts">
import { BaseModal } from '~/shared/ui-kit/base-modal';
import { EBaseButtonMode, EBaseButtonSize, EBaseButtonTheme } from '~/shared/ui-kit/base-button/enums';
import type {TBaseModalConfirmProps} from "~/shared/components/modal-confirm/types.ts";

withDefaults(defineProps<TBaseModalConfirmProps>(), {
  text: '',
  confirmLabel: 'Подтвердить',
  cancelLabel: 'Отмена',
  confirmTheme: EBaseButtonTheme.Primary,
  confirmMode: EBaseButtonMode.Default,
  confirmSize: EBaseButtonSize.Medium,
  cancelTheme: EBaseButtonTheme.Secondary,
  cancelMode: EBaseButtonMode.Default,
  cancelSize: EBaseButtonSize.Medium,
});

const emit = defineEmits<{
  (event: 'confirm' | 'cancel' | 'close'): void;
}>();

const modalStore = useModalStore();

const handleClose = () => {
  modalStore.removeFromModalStack()
  emit('close')
}

const handleCancel = () => {
  modalStore.removeFromModalStack()
  emit('cancel')
}

const handleConfirm = () => {
  modalStore.removeFromModalStack()
  emit('confirm')
}
</script>

<template>
  <BaseModal
    ref="modal"
    :title="title"
    :text="text"
    @close="handleClose"
  >
    <template #footer>
      <form
        class="modal-confirm__actions"
        method="dialog"
      >
        <BaseButton
          autofocus
          type="submit"
          value="cancel"
          :theme="cancelTheme"
          :mode="cancelMode"
          :size="cancelSize"
          @click="handleCancel"
        >
          {{ cancelLabel }}
        </BaseButton>
        <BaseButton
          type="submit"
          value="confirm"
          :theme="confirmTheme"
          :mode="confirmMode"
          :size="confirmSize"
          @click="handleConfirm"
        >
          {{ confirmLabel }}
        </BaseButton>
      </form>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
.modal-confirm__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--size-3xs-8);
}
</style>
