import {Auth, Password} from '../../../types/Authentication';

export type CreateAccountPayload = Pick<
  Auth,
  'fullName' | 'email' | 'agreeToTerms' | 'receiveEmail'
> & {
  password: string;
};

export type VerifyEmailPayload = Pick<Auth, 'id'> & {emailCode: number};

export type SignInWithGooglePayload = {};

export type LoginPayload = Pick<Auth, 'email'> & {
  password: string;
};

export type SendPasswordResetCodePayload = Pick<Auth, 'email'>;

export type ResetPasswordPayload = Pick<
  Password,
  'newPassword' | 'email' | 'token'
>;

export type ValidatePasswordResetCodePayload = Pick<Auth, 'email'> & {
  passwordCode: number;
};

export type CreateAccountPayloadApiArg = {
  createAccount: CreateAccountPayload;
};
export type VerifyEamilPayloadApiArg = {
  verifyEmail: VerifyEmailPayload;
};
export type LoginPayloadPostArg = {
  login: LoginPayload;
};
export type SignInWithGooglePayloadApiArg = {
  signInWithGoogle: SignInWithGooglePayload;
};
export type SendPasswordResetCodePayloadApiArg = {
  sendPasswordResetCode: SendPasswordResetCodePayload;
};
export type ResendEmailVerificationCodePayloadApiArg = {
  resendEmailVerificationCode: SendPasswordResetCodePayload;
};
export type ResetPasswordPayloadApiArg = {
  resetPassword: ResetPasswordPayload;
};
export type ValidatePasswordResetCodeApiArg = {
  validatePasswordResetCode: ValidatePasswordResetCodePayload;
};
