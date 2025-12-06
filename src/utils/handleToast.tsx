import { modalRef } from '@/hooks/modalRef';
import axios, { AxiosError } from 'axios';

const isBackEndError = (err: any): err is AxiosError<{ message: string }> => {
  if (err?.response?.data) {
    return true;
  }
  return false;
};

const isStrapiError = (
  err: any,
): err is AxiosError<{
  error: {
    message: string;
  };
}> => {
  if (err?.response?.data?.error) {
    return true;
  }
  return false;
};

const errorTranslations: Record<string, string> = {
  'Invalid identifier or password': 'E-mail ou senha inválidos',
  'Too many requests, please try again later.':
    'Muitas requisições, por favor tente novamente mais tarde',
  'The provided current password is invalid': 'Senha antiga incorreta',
  'Username already taken': 'E-mail já esta sendo utilizado',
  'Missing or invalid credentials': 'Sessão expirada, faça login novamente',
};

export const getErrorMessage = (err: any): string => {
  if (axios.isAxiosError(err)) {
    if (isStrapiError(err)) {
      return err.response?.data.error.message as string;
    }

    if (isBackEndError(err)) {
      return err.response?.data.message as string;
    }
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  return err?.message || '';
};

const handleError = (err: any) => {
  const message = getErrorMessage(err);
  const translated = errorTranslations[message] || message || 'Erro';

  modalRef.openError(translated);
};

export const handleSuccess = (message: string) => {
  modalRef.openSuccess(message);
};

export default handleError;
