import * as yup from 'yup'

export const signInValidation = yup.object().shape({
  email: yup.string().email('Invalid email address ').required('Required'),
  password: yup
    .string()
    .required('Required')
    .min(6, 'Must be 6 characters or more')
    .max(40, 'Must be 40 characters or less'),
})

export const signUpValidation = yup.object().shape({
  username: yup
    .string()
    .required('Required')
    .min(3, 'Must be 3 characters or more')
    .max(20, 'Must be 20 characters or less'),
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup
    .string()
    .required('Required')
    .min(6, 'Must be 6 characters or more')
    .max(40, 'Must be 40 characters or less'),
  password2: yup
    .string()
    .required('Required')
    .min(6, 'Must be 6 characters or more')
    .max(40, 'Must be 40 characters or less')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  agreement: yup.boolean().oneOf([true], 'Required'),
})

export const editProfileValidation = yup.object().shape(
  {
    username: yup.string().min(3, 'Must be 3 characters or more').max(20, 'Must be 20 characters or less'),
    email: yup.string().email('Invalid email address'),
    password: yup
      .string()
      .nullable()
      .notRequired()
      .when('password', {
        is: (value) => value?.length,
        then: (rule) => rule.min(6, 'Must be 6 characters or more').max(40, 'Must be 40 characters or less'),
      }),
    image: yup
      .string()
      .nullable()
      .notRequired()
      .when('image', {
        is: (value) => value?.length,
        then: (rule) => rule.url('Invalid URL').matches(/\.(jpg|jpeg|png|webp|bmp|avif|gif|svg)$/, 'Invalid URL'),
      }),
  },
  [
    ['password', 'password'],
    ['image', 'image'],
  ]
)

export const editAtricleValidation = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  textarea: yup.string().required('Required'),
})
