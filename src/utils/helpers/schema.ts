import * as Yup from 'yup';
export const schema = {
  fullname: Yup.string().required().min(3).label('Fullname'),
  email: Yup.string().required().email().label('Email'),
  defaultPassword: Yup.string().trim().required('Please Enter your Password'),
  password: Yup.string()
    .required(`Please Enter your Password`)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase and One Number',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], `Confirm password must match password`)
    .required()
    .label('Confirm Password'),
  acceptTC: Yup.boolean()
    .isTrue('Accept terms & condition must be checked')
    .required()
    .label('Accept terms & condition'),
};

export const validationSchema = (schema: Yup.AnyObject) =>
  Yup.object().shape(schema);
