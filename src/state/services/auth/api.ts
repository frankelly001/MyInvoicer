import {HttpAuthSuccessResponse} from '../../../types/ApiResponse';
import {Auth, AuthSuccess} from '../../../types/Authentication';
import {authEndpoints} from './endpoints';
import {baseApi as api} from '../baseApi';
import {
  CreateAccountPayloadApiArg,
  LoginPayloadPostArg,
  ResendEmailVerificationCodePayloadApiArg,
  ResetPasswordPayloadApiArg,
  SendPasswordResetCodePayloadApiArg,
  SignInWithGooglePayloadApiArg,
  ValidatePasswordResetCodeApiArg,
  VerifyEamilPayloadApiArg,
} from './type';

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    createAccountApi: build.mutation<
      HttpAuthSuccessResponse<AuthSuccess>,
      CreateAccountPayloadApiArg
    >({
      query: queryArg => ({
        url: authEndpoints.CREATE_ACCOUNT,
        method: 'POST',
        body: queryArg.createAccount,
      }),
    }),

    verifyEmailApi: build.mutation<
      HttpAuthSuccessResponse<Auth>,
      VerifyEamilPayloadApiArg
    >({
      query: queryArg => ({
        url: authEndpoints.VERIFY_EMAIL,
        method: 'POST',
        body: queryArg.verifyEmail,
      }),
    }),

    loginApi: build.mutation<
      HttpAuthSuccessResponse<AuthSuccess>,
      LoginPayloadPostArg
    >({
      query: queryArg => ({
        url: authEndpoints.LOGIN,
        method: 'POST',
        body: queryArg.login,
      }),
    }),

    sendPasswordResetCodeApi: build.mutation<
      HttpAuthSuccessResponse<AuthSuccess>,
      SendPasswordResetCodePayloadApiArg
    >({
      query: queryArg => ({
        url: authEndpoints.SEND_PASSWORD_RESET_CODE,
        method: 'POST',
        body: queryArg.sendPasswordResetCode,
      }),
    }),

    resendEmailVerificationCodeApi: build.mutation<
      HttpAuthSuccessResponse<AuthSuccess>,
      ResendEmailVerificationCodePayloadApiArg
    >({
      query: queryArg => ({
        url: authEndpoints.RESEND_EMAIL_VERIFICATION_CODE,
        method: 'POST',
        body: queryArg.resendEmailVerificationCode,
      }),
    }),

    resetPasswordApi: build.mutation<
      HttpAuthSuccessResponse<AuthSuccess>,
      ResetPasswordPayloadApiArg
    >({
      query: queryArg => ({
        url: authEndpoints.RESET_PASSWORD,
        method: 'POST',
        body: queryArg.resetPassword,
      }),
    }),

    validatePasswordResetCodeApi: build.mutation<
      HttpAuthSuccessResponse<AuthSuccess>,
      ValidatePasswordResetCodeApiArg
    >({
      query: queryArg => ({
        url: authEndpoints.VALIDATE_PASSWORD_RESET_CODE,
        method: 'POST',
        body: queryArg.validatePasswordResetCode,
      }),
    }),

    signInWithGoogleApi: build.mutation<
      HttpAuthSuccessResponse<AuthSuccess>,
      SignInWithGooglePayloadApiArg
    >({
      query: queryArg => ({
        url: authEndpoints.VALIDATE_PASSWORD_RESET_CODE,
        method: 'POST',
        body: queryArg.signInWithGoogle,
      }),
    }),
  }),
});
export {injectedRtkApi as authApi};
export const {
  useCreateAccountApiMutation,
  useVerifyEmailApiMutation,
  useResetPasswordApiMutation,
  useLoginApiMutation,
  useSendPasswordResetCodeApiMutation,
  useValidatePasswordResetCodeApiMutation,
  useResendEmailVerificationCodeApiMutation,
  useSignInWithGoogleApiMutation,
} = injectedRtkApi;
