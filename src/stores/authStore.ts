import { checkAuthAction } from '@/actions/check-auth.action';
import { LoginAction } from '@/actions/login-action';
import { AuthStatus } from '@/interfaces/auth-enum';
import type { IUser } from '@/interfaces/user.interface';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking );
  const user = ref<IUser | undefined>();
  const token = ref(useLocalStorage('token', ''));
  const router = useRouter();

  const onLogin = async (ficha: number, password: string) => {
    try {
      const loginResp = await LoginAction(ficha, password);
      if (!loginResp.ok) {
        return false;
      }
      user.value = loginResp.user;
      token.value = loginResp.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (err) {
      console.log(err);
      return logout();
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');

    user.value = undefined;
    token.value = '';
    authStatus.value = AuthStatus.Unauthenticated;
    router.replace({ name: 'login' });
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();

      if (!statusResp.ok) {
        // Manejo explícito del estado de no autenticado
        logout();
        return false;
      }

      // Si la respuesta es válida, actualiza el estado de autenticación
      authStatus.value = AuthStatus.Authenticated;
      user.value = statusResp.user;
      token.value = statusResp.token;
      return true;
    } catch (error) {
      console.log("Error de autenticación:", error);
      // En caso de error (e.g., 401, problemas con la red), se loguea al usuario
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,
    //getters

    isChecking: computed(() => (authStatus.value === AuthStatus.Checking)),
    isAuthenticated: computed(() => (authStatus.value === AuthStatus.Authenticated)),
    isUnAuthenticated: computed(() => (authStatus.value === AuthStatus.Unauthenticated)),

    //actions
    onLogin,
    logout,
    checkAuthStatus
  };
});
