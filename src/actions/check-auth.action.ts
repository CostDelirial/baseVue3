import { isAxiosError } from 'axios';
import { soporteApi } from '@/apis/soporteApi';
import type { AuthResponse, IUser } from '@/interfaces';
interface CheckError {
  ok: false;
}
interface CheckSuccess {
  ok: true;
  user: IUser;
  token: string;
}


export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    const localToken = localStorage.getItem('token');
    if (localToken && localToken.length < 10) {
      return { ok: false };
    }

    const { data } = await soporteApi.get<AuthResponse>('/usuarioApp/datos/user');

    return {
      ok: true,
      user: data.user,
      token: data.token
    };

  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      };
    }

    throw new Error('No se pudo verificar la sesión');
  }
};
