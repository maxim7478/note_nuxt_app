<script setup lang="ts">
import {AUTH_PAGE} from "~/shared";

const route = useRoute()
const isRegistration = computed(() => route.query.mode === 'register')
</script>

<template>
  <main class="auth-page">
    <div class="auth-page__panel">
      <RegistrationForm v-if="isRegistration" />
      <AuthForm v-else />

      <p
        v-if="isRegistration"
        class="auth-page__switch text-caption"
      >
        Уже есть аккаунт? <NuxtLink :to="AUTH_PAGE">Войти</NuxtLink>
      </p>
      <p
        v-else
        class="auth-page__switch text-caption"
      >
        Нет аккаунта?
        <NuxtLink :to="`/${AUTH_PAGE}?mode=register`">
          Зарегистрироваться
        </NuxtLink>
      </p>
    </div>
  </main>
</template>

<style scoped lang="scss">
.auth-page {
  display: grid;
  justify-items: center;
  padding: clamp(var(--size-2xl-24), 7vw, var(--size-8xl-64)) var(--size-md-16);

  &__panel {
    box-sizing: border-box;
    width: min(100%, 29rem);
    padding: clamp(var(--size-2xl-24), 5vw, var(--size-5xl-40));
    border: 1px solid var(--color-gray-11);
    border-radius: var(--size-md-16);
    background-color: var(--color-white-1);
  }

  &__switch {
    margin: var(--size-2xl-24) 0 0;
    padding-top: var(--size-md-16);
    border-top: 1px solid var(--color-gray-11);
    color: var(--color-gray-6);

    a {
      color: var(--color-black-1);
      font-weight: var(--font-weight-bold);
      text-underline-offset: 0.2em;

      &:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
      }
    }
  }
}
</style>
