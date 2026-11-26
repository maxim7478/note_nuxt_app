<script setup lang="ts">
import { z } from 'zod'

const credentials = reactive({ username: '', password: '' })
const form = useTemplateRef('form')

const { execute, error, status } = useAPI('/auth/login',{
  method: 'POST',
  watch: false,
  server: false,
  immediate: false,

  onRequest({ options }) {
    options.body = {
      username: credentials.username.trim(),
      password: credentials.password,
    }
  }
})

const schema = z.object({
  username: z.string().trim().min(1, 'Введите имя пользователя'),
  password: z.string().min(1, 'Введите пароль'),
})

const login = async () => {
  await execute()

  if (error.value) {
    form.value?.setGeneralError(
        error.value.statusCode === 401
            ? 'Неверное имя пользователя или пароль'
            : error.value.message,
    )
    return
  }

  await navigateTo('/notes')
}

const handleSubmit = async () => {
  if (await form.value?.validate()) {
    await login()
  }
}
</script>

<template>
  <BaseForm
    ref="form"
    id-form="auth-form"
    class="auth-form"
    :model="credentials"
    :schema="schema"
    @submit="handleSubmit"
  >
    <h1
      id="auth-form-title"
      class="text-heading"
    >Вход в аккаунт</h1>
    <BaseFormItem name="username">
      <template #default="{ error, onBlur }">
        <BaseInput
          v-model="credentials.username"
          required
          label="Имя пользователя"
          name="username"
          autocomplete="username"
          autocapitalize="none"
          :error="error"
          @blur="onBlur"
        />
      </template>
    </BaseFormItem>
    <BaseFormItem name="password">
      <template #default="{ error, onBlur }">
        <BaseInput
          v-model="credentials.password"
          required
          label="Пароль"
          type="password"
          name="password"
          autocomplete="current-password"
          :error="error"
          @blur="onBlur"
        />
      </template>
    </BaseFormItem>
    <p v-if="form?.getGeneralError()">
      {{ form?.getGeneralError() }}
    </p>
    <BaseButton
      type="submit"
      text="Войти"
    />
  </BaseForm>
</template>

<style scoped lang="scss">
.auth-form {
  display: grid;
  gap: var(--size-lg-18);
}
</style>
