export interface AuthState {
  phoneNumber: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType extends AuthState {
  setAuthState: (state: Partial<AuthState>) => void;
  logout: () => void;
}

export interface ILoginData {
  phone?: string;
  email?: string;
  password?: string;
}

export interface IRegisterData {
  phone?: string;
  email?: string;
  password?: string;
}
