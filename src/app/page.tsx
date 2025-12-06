'use client';

import { IResponseLogin, useAuth } from '@/hooks/useAuth';
import { LoginSchema } from '@/validations/LoginSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import publicRoute from '@/hooks/publicRoute';
import { useState } from 'react';
import api from '@/services/api';

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });

  const handleLocalStorage = (response: IResponseLogin) => {
    localStorage.setItem('@Placeholder:user', JSON.stringify(response.user));

    localStorage.setItem('@Placeholder:accessToken', response.jwt);

    localStorage.setItem('@Placeholder:refreshToken', response.refreshToken);

    setUser(response.user);
  };

  const handleLogin: SubmitHandler<LoginProps> = async value => {
    try {
      setIsLoading(true);
      localStorage.clear();

      const { data } = await api.post<IResponseLogin>('/auth/local', {
        identifier: value.email.trim(),
        password: value.password,
        requestRefresh: remember,
      });

      handleLocalStorage(data);
    } catch (error) {
      setErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center font-medium text-gray-800">
      <span className="text-2xl">Login</span>
    </div>
  );
};

export default publicRoute(Login);
