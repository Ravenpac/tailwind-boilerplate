/* eslint-disable no-console */
import { PropsWithChildren } from 'react';
import { useModal } from '@/hooks/useModalContext';
import SuccessModal from '../SuccessModal/SuccessModal';
import ErrorModal from '../ErrorModal/ErrorModal';

const ModalManager = ({ children }: PropsWithChildren) => {
  const { globalError, globalSuccess, closeGlobalModals } = useModal();

  return (
    <>
      {children}

      {globalError && (
        <ErrorModal
          title="Erro!"
          description={globalError.description}
          buttonText="Voltar"
          action={closeGlobalModals}
          setModalOpen={() => closeGlobalModals()}
        />
      )}

      {globalSuccess && (
        <SuccessModal
          description={globalSuccess.description}
          setModalOpen={() => closeGlobalModals()}
        />
      )}
    </>
  );
};

export default ModalManager;
