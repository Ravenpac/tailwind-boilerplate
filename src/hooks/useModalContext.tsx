'use client';

import { createContext, useContext, useState } from 'react';

interface ErrorData {
  description: string;
}

interface SuccessData {
  description: string;
}

interface ModalContextType {
  openError: (title: string, description: string) => void;
  openSuccess: (description: string) => void;
  closeGlobalModals: () => void;
  globalError: ErrorData | null;
  globalSuccess: SuccessData | null;
}

const ModalContext = createContext<ModalContextType>({} as any);

export const ModalProvider = ({ children }: any) => {
  const [globalError, setGlobalError] = useState<ErrorData | null>(null);
  const [globalSuccess, setGlobalSuccess] = useState<SuccessData | null>(null);

  const openError = (description: string) => {
    setGlobalSuccess(null);
    setGlobalError({ description });
  };

  const openSuccess = (description: string) => {
    setGlobalError(null);
    setGlobalSuccess({ description });
  };

  const closeGlobalModals = () => {
    setGlobalError(null);
    setGlobalSuccess(null);
  };

  return (
    <ModalContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        openError,
        openSuccess,
        closeGlobalModals,
        globalError,
        globalSuccess,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
