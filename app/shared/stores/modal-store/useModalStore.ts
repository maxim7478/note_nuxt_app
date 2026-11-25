import type {IModalProps} from "~/shared/stores/modal-store/types.ts";
import {generateId} from "~/shared";

export const useModalStore = defineStore('modalStore', () => {
  const modalsStack = ref<IModalProps[]>([]);

  const addModalToStack = (dialogConfig: Omit<IModalProps, 'id'>) => {
    const id = generateId();
    modalsStack.value.push({
      config: {
        id,
        ...dialogConfig,
      },
      id,
      handlers: { ...dialogConfig.handlers },
      props: { ...dialogConfig.props },
      component: shallowRef(dialogConfig.component),
    });
  };
  const removeFromModalStack = () => {
    modalsStack.value.pop();
  };

  const clearStack = () => {
    modalsStack.value = [];
  };

  const computedModalStack = computed(() => {
    return modalsStack.value;
  });

  return {
    addModalToStack,
    removeFromModalStack,
    clearStack,
    computedModalStack,
  };
});
