import * as yup from 'yup';

export const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('Preencha os campos necessários'),
});
