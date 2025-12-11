import { useOutside } from '@/hooks/useOutside';
import Image from 'next/image';
import { useRef } from 'react';

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  action: () => void;
  buttonText: string;
  secondaryButtonText?: string;
  secondaryAction?: () => void;
}

const ErrorModal = ({
  setModalOpen,
  title,
  description,
  action,
  buttonText,
  secondaryButtonText,
  secondaryAction,
}: ModalProps) => {
  const modalRef = useRef(null);

  const handleSecondaryAction = () => {
    if (secondaryAction) {
      secondaryAction();
    } else {
      setModalOpen(false);
    }
  };

  useOutside(modalRef, handleSecondaryAction);

  return (
    <div className="fixed left-0 top-0 z-[20000] flex h-full w-full items-center justify-center bg-[rgba(144,159,89,0.4)]">
      <main
        ref={modalRef}
        className="flex h-fit w-[18.75rem] flex-col rounded-lg bg-white shadow-[rgba(0,0,0,0.16)_0px_1px_4px]"
      >
        <header className="flex max-h-14 min-h-14 w-full items-center justify-center gap-2 rounded-t-lg border-b border-[rgba(89,90,91,0.1)]">
          <Image
            src="/img/modal/error.svg"
            alt="Ícone de erro"
            width={24}
            height={24}
            className="h-auto w-6"
          />
          <h1 className="font-title text-xl font-semibold text-error-1">
            {title}
          </h1>
        </header>

        <section className="flex h-fit w-full p-4">
          <p className="text-base font-light text-neutral-60">{description}</p>
        </section>

        <footer className="flex max-h-14 min-h-14 w-full items-center justify-end gap-1.5 border-t border-[rgba(89,90,91,0.1)] pr-1.5">
          {secondaryButtonText && (
            <button
              type="button"
              onClick={handleSecondaryAction}
              className="flex max-h-10 min-h-10 w-fit items-center justify-center rounded-full border border-error-1 bg-white px-5 font-body text-base font-medium text-error-1 transition-all duration-200 ease-in-out hover:bg-black/5"
            >
              {secondaryButtonText}
            </button>
          )}

          <button
            type="button"
            onClick={action}
            className="flex max-h-10 min-h-10 w-fit items-center justify-center rounded-full bg-error-1 px-2 font-body text-base font-medium text-white transition-all duration-200 ease-in-out hover:bg-error-1-hover"
          >
            {buttonText}
          </button>
        </footer>
      </main>
    </div>
  );
};

export default ErrorModal;
