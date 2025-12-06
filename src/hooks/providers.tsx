'use client';

import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ptBR } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';
import handleError from '@/utils/handleToast';
import AuthProvider from '@/hooks/useAuth';
import ModalManager from '@/components/ModalManager/ModalManager';
import { ModalProvider, useModal } from './useModalContext';
import { setModalRef } from './modalRef';

setDefaultOptions({
  locale: ptBR,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: handleError,
      retry: false,
      initialDataUpdatedAt: 0,
      refetchOnWindowFocus: false,
    },
  },
});

const InitModalRef = () => {
  const modal = useModal();
  setModalRef(modal);
  return null;
};

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <InitModalRef />
          <ModalManager>{children}</ModalManager>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
