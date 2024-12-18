import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';


const isAuthenticated = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();

  // Si se está verificando el estado de autenticación, permite que la navegación continúe
  if (authStore.isChecking) {
    return next(); // Deja que la navegación continue mientras se verifica el estado
  }

  // Si ya está autenticado y trata de acceder a la ruta de login, redirigirlo al dashboard o a otra ruta
  if (authStore.isAuthenticated && to.name === 'login') {
    return next({ name: 'dashboard' }); // Redirigir al dashboard si ya está autenticado
  }

  // Si no está autenticado, permite que el usuario acceda a la ruta de login
  console.log(authStore.isUnAuthenticated)
  if (authStore.isUnAuthenticated && to.name === 'login') {
    return next(); // Permite el acceso a la página de login
  }

  // Si no está autenticado y trata de acceder a una ruta protegida, redirigirlo a login
  if (authStore.isUnAuthenticated) {
    return next({ name: 'login' });
  }

  // Si está autenticado y trata de acceder a una ruta protegida, permite que la navegación continúe
  next();
};

export default isAuthenticated;
