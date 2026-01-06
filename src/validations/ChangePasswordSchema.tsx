import * as yup from 'yup';

export const ChangePasswordSchema = yup.object().shape({
  old_password: yup.string().trim().required('Preencha os campos necessários'),
  password: yup
    .string()
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, {
      message:
        'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial',
    })
    .required('Preencha os campos necessários'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'As senhas devem ser iguais')
    .required('Preencha os campos necessários'),
});
