<template>
  <RouterView />
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { AuthStatus } from './interfaces/auth-enum';
import { useAuthStore } from './stores/authStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute()

onMounted(() => {
  if (authStore.authStatus === AuthStatus.Checking) {
    authStore.checkAuthStatus();
  }
});

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Authenticated && route.path.includes('/auth')) {
      // Si ya está autenticado y está en una ruta de autenticación, redirige al dashboard
      router.replace({ name: 'dashboard' });
    }
  },
  {
    immediate: true, // Llamar inmediatamente al suscribirse
  }
);
</script>
