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
