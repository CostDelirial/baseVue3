import { LoginAction } from '@/actions/login-action';
import { AuthStatus } from '@/interfaces/auth-enum';
import type { IUser } from '@/interfaces/user.interface';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
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
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    router.replace({ name: 'login' });
    return false;
  };
  return {
    user,
    token,
    authStatus,
    //getters

    isChecking: computed(() => (authStatus.value = AuthStatus.Checking)),
    isAuthenticated: computed(() => (authStatus.value = AuthStatus.Authenticated)),
    isUnAuthenticated: computed(() => (authStatus.value = AuthStatus.Unauthenticated)),

    //actions
    onLogin,
    logout,
  };
});
