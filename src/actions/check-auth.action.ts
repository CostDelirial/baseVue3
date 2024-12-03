import type { IUser } from '@/interfaces/user.interface';
import { isAxiosError } from 'axios';
import { soporteApi } from '@/apis/soporteApi';

interface CheckingError {
  ok: false;
}

interface ChekingSucces {
  ok: true;
  user: IUser;
  token: string;
}

export interface IAuthResponse {
  ok: true;
  user: IUser;
  token: string;
}

export const chackAuthAction = async (): Promise<CheckingError | ChekingSucces> => {
  try {
    const localToken = localStorage.getItem('token');
    if (
      localToken === '' ||
      localToken === null ||
      localToken === undefined ||
      localToken.length < 10
    ) {
      return { ok: false };
    }

    const { data } = await soporteApi.get<IAuthResponse>('/usuarioApp/datos/user');
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 401) {
      return { ok: false };
    }
    throw new Error('Error ocurred');
  }
};
