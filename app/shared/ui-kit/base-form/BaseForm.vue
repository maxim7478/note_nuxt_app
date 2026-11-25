<script setup lang="ts">
import { provide, ref } from 'vue';
import { get, set, unset } from 'lodash-es';
import type { FormApi, FormProps } from './types';
import { FormApiKey } from './injectionKey';

const props = defineProps<FormProps>();

const emit = defineEmits<(event: 'submit') => void>();

const errors = ref<Record<string, unknown>>({});
const generalError = ref<string | null>(null);

const validate = async () => {
  const result = await props.schema.safeParseAsync(props.model);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      set(fieldErrors, mergePath(issue.path), issue.message);
    });
    errors.value = fieldErrors;
    return false;
  }

  errors.value = {};
  return true;
};

const validateField = async (fieldPath: string): Promise<void> => {
  clearError(fieldPath);

  const result = await props.schema.safeParseAsync(props.model);

  if (result.success) {
    return;
  }

  const fieldPathSegments = fieldPath.split('.');

  const relevantIssue = result.error.issues.find(issue => {
    const issuePath = issue.path.map(String);
    return fieldPathSegments.every((seg, i) => issuePath[i] === seg);
  });

  if (relevantIssue) {
    set(errors.value, mergePath(relevantIssue.path), relevantIssue.message);
  }
};

const setGeneralError = (message: string) => {
  if (!message) {
    return;
  }
  generalError.value = message;
};

const setServerError = (path: string, message: string) => {
  set(errors.value, path, message);
};

const clearError = (fieldPath: string) => {
  const newErrors = { ...errors.value };
  unset(newErrors, fieldPath);
  errors.value = newErrors;
};

const clearGeneralError = () => {
  generalError.value = null;
};

const clearAllErrors = () => {
  errors.value = {};
  clearGeneralError();
};

const getError = (fieldPath: string) => {
  return get(errors.value, fieldPath, null);
};

const getGeneralError = () => generalError.value;

const isValidField = (field: string) => getError(field) === null;

const handleSubmit = () => {
  emit('submit');
};

const mergePath = (path: (string | number | symbol)[]) => {
  return path.map(String).join('.');
};

const formApi: FormApi = {
  validate,
  getError,
  getGeneralError,
  isValidField,
  validateField,
  setServerError,
  setGeneralError,
  clearError,
  clearGeneralError,
  clearAllErrors,
};

provide(FormApiKey, formApi);

defineExpose({
  validate,
  isValidField,
  getError,
  getGeneralError,
  validateField,
  setServerError,
  setGeneralError,
  clearError,
  clearGeneralError,
  clearAllErrors,
});
</script>

<template>
  <form
    :id="idForm"
    novalidate
    class="base-form"
    @submit.prevent="handleSubmit"
  >
    <slot />
  </form>
</template>