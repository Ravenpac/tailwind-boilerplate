import { useOutside } from '@/hooks/useOutside';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  route?: string;
  action?: () => void;
}

const SuccessModal = ({
  setModalOpen,
  description,
  route,
  action,
}: ModalProps) => {
  const router = useRouter();
  const modalRef = useRef(null);

  const handleClose = () => {
    setModalOpen(false);
    if (action) {
      action();
    }
    if (route) {
      router.push(route);
    }
  };

  useOutside(modalRef, handleClose);

  return (
    <div className="fixed left-0 top-0 z-[20000] flex h-full w-full items-center justify-center bg-[rgba(144,159,89,0.4)]">
      <main
        ref={modalRef}
        className="flex h-fit w-[18.75rem] flex-col rounded-lg bg-white shadow-[rgba(0,0,0,0.16)_0px_1px_4px]"
      >
        <header className="flex max-h-14 min-h-14 w-full items-center justify-center gap-2 rounded-t-lg border-b border-[rgba(89,90,91,0.1)]">
          <Image
            src="/img/modal/success.svg"
            alt="Ícone de sucesso"
            width={24}
            height={24}
            className="h-auto w-6"
          />
          <h1 className="font-title text-xl font-semibold text-success-1">
            Sucesso!
          </h1>
        </header>

        <section className="flex h-fit w-full flex-col gap-1.5 p-4">
          <p className="whitespace-pre-line text-base font-light text-neutral-60">
            {description}
          </p>
        </section>

        <footer className="flex max-h-14 min-h-14 w-full items-center justify-end gap-1.5 border-t border-[rgba(89,90,91,0.1)] pr-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex max-h-10 min-h-10 w-28 items-center justify-center rounded-full bg-success-1 font-body text-base font-medium text-white transition-all duration-200 ease-in-out hover:bg-success-1-hover"
          >
            Continuar
          </button>
        </footer>
      </main>
    </div>
  );
};

export default SuccessModal;
