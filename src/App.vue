<template>
  <RouterView />
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AuthStatus } from './interfaces/auth-enum';
import { useAuthStore } from './stores/authStore';

const authStore = useAuthStore();
const router = useRouter();

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Unauthenticated) {
      console.log('salri a login siempre');
      router.replace({ name: 'login' });
      return;
    }
    if (state.authStatus === AuthStatus.Authenticated) {
      console.log('entrar a home siempre');
      router.replace({ name: 'dashboard' });
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>
