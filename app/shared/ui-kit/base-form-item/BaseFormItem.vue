<script setup lang="ts">
import { inject, computed, ref } from 'vue';
import { FormApiKey } from '../base-form/injectionKey';
import { extractString } from './utils';
import type { FormItemProps } from './types';

const props = defineProps<FormItemProps>();

const form = inject(FormApiKey);

const isTouched = ref(false);
const isDirty = ref(false);

const computedSpecificError = computed(() => form?.getError(props.name));
const computedError = computed(() => extractString(computedSpecificError.value));
const computedHasError = computed(() => Boolean(computedSpecificError.value));

const handleInput = async () => {
  isDirty.value = true;
  await form?.validateField(props.name);
};

const handleBlur = async () => {
  isTouched.value = true;
  await form?.validateField(props.name);
};
</script>

<template>
  <div class="base-form-item">
    <slot
      :error="computedError"
      :has-error="computedHasError"
      :touched="isTouched"
      :dirty="isDirty"
      :on-input="handleInput"
      :on-blur="handleBlur"
    />
  </div>
</template>