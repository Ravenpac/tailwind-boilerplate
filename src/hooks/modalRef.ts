export const modalRef: any = {};

export const setModalRef = (modal: any) => {
  modalRef.openError = modal.openError;
  modalRef.openSuccess = modal.openSuccess;
};
