import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is a required field')
    .min(4, 'Username must be at least 4 characters long')
    .matches(/[a-zA-Z]/, 'Username can only contain Latin letters.'),
  emailAddress: yup
    .string()
    .email('Enter a valid email address')
    .required('Email address is required')
  ,
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default validationSchema;