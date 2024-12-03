import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { AuthStatus } from '@/interfaces/auth-enum';

const isAuthenticated = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  console.log(authStore.authStatus);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  authStore.authStatus === AuthStatus.Checking ? next({ name: 'login' }) : next();

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  authStore.authStatus === AuthStatus.Unauthenticated ? next({ name: 'login' }) : next();
};

export default isAuthenticated;
