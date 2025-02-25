export interface AuthSuccess {
  token: string;
  receiveEmail: boolean;
  agreeToTerms: boolean;
  createdAt: string;
  email: string;
  fullName: string;
  accNumber: string;
  address: string;
  accName: string;
  bankName: string;
  city: string;
  companyName: string;
  hasAddedBusiness: boolean;
  country: string;
  phone: string;
  state: string;
  tinNumber: string;
  website: string;
  logoUrl: string;
  imageUrl: string;
  zip: string;
  id: string;
  EmailStatusCode: boolean;
  updatedAt: string | null;
  refreshToken: string;
  completedSettings: boolean;
}

export interface Auth {
  id: string;
  email: string;
  companyName: string;
  fullName: string;
  isEmailVerified: boolean;
  receiveEmail: boolean;
  agreeToTerms: boolean;
  createdAt: string;
  updatedAt: string | null;
  refreshToken: string;
}

export interface Profile {
  receiveEmail: boolean;
  agreeToTerms: boolean;
  createdAt: string;
  email: string;
  fullName: string;
  accNumber: string;
  accName: string;
  address: string;
  bankName: string;
  city: string;
  companyName: string;
  country: string;
  phone: string;
  state: string;
  tinNumber: string;
  website: string;
  logoUrl: string | null;
  imageUrl: string;
  zip: string;
  id: string;
  refreshToken: string;
  completedSettings: boolean;
}

export interface GoogleAuth {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  locale: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

export type AuthWithGoogle = Pick<
  GoogleAuth,
  | 'email'
  | 'email_verified'
  | 'family_name'
  | 'given_name'
  | 'locale'
  | 'name'
  | 'picture'
  | 'sub'
>;
export interface Password {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  password: string;
  email: string;
  token: string;
}
export type ResetPassword = Pick<
  Password,
  'newPassword' | 'confirmNewPassword' | 'email' | 'token'
>;

export type CreateAccount = Pick<
  Auth,
  'fullName' | 'email' | 'agreeToTerms' | 'receiveEmail'
> & {
  password: string;
};

export type UpdateAccount = Pick<
  Profile,
  | 'companyName'
  | 'address'
  | 'phone'
  | 'fullName'
  | 'country'
  | 'state'
  | 'city'
  | 'zip'
  | 'tinNumber'
  | 'website'
  | 'accNumber'
  | 'accName'
  | 'bankName'
  | 'logoUrl'
>;

export type RefreshTokenPayload = {
  accessToken?: string;
  refreshToken?: string | null;
  expiresAt: number;
};
