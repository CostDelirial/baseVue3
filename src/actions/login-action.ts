import { soporteApi } from '@/apis/soporteApi';
import type { IUser } from '@/interfaces/user.interface';
import { isAxiosError } from 'axios';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSucces {
  ok: true;
  user: IUser;
  token: string;
}

export const LoginAction = async (
  ficha: number,
  password: string,
): Promise<LoginError | LoginSucces> => {
  try {
    console.log({ ficha, password });
    const { data } = await soporteApi.post('/auth/login', { ficha, password });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        ok: false,
        message: 'User or password incorrect',
      };
    }
    throw new Error('error ocured');
  }
};
