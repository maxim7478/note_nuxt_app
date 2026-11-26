<script setup lang="ts">
import { z } from 'zod'

const credentials = reactive({ username: '', password: '' })
const form = useTemplateRef('form')

const schema = z.object({
  username: z.string().min(3, 'Введите не менее 3 символов').max(32, 'Введите не более 32 символов')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Используйте латинские буквы, цифры, дефис и подчёркивание'),
  password: z.string().min(8, 'Введите не менее 8 символов').max(128, 'Введите не более 128 символов'),
})

const register = async () => {}

const handleSubmit = async () => {
  if (await form.value?.validate()) {
    await register()
  }
}
</script>

<template>
  <BaseForm
    ref="form"
    id-form="registration-form"
    class="registration-form"
    aria-labelledby="registration-form-title"
    :model="credentials"
    :schema="schema"
    @submit="handleSubmit"
  >
    <h1 id="registration-form-title" class="text-heading">Создание аккаунта</h1>
    <BaseFormItem name="username">
      <template #default="{ error, onBlur }">
        <BaseInput
          v-model="credentials.username"
          label="Имя пользователя"
          name="username"
          autocomplete="username"
          autocapitalize="none"
          required
          :error="error"
          @blur="onBlur"
        />
      </template>
    </BaseFormItem>
    <BaseFormItem name="password">
      <template #default="{ error, onBlur }">
        <BaseInput
          v-model="credentials.password"
          label="Пароль"
          type="password"
          name="password"
          autocomplete="new-password"
          hint="Не менее 8 символов."
          required
          :error="error"
          @blur="onBlur"
        />
      </template>
    </BaseFormItem>
    <BaseButton
      type="submit"
      text="Зарегистрироваться"
    />
  </BaseForm>
</template>

<style scoped lang="scss">
.registration-form {
  display: grid;
  gap: var(--size-lg-18);
}
</style>
