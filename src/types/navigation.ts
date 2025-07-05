export type RootStackParamList = {
  "(auth)": undefined;
  "(tabs)": undefined;
};

export type AuthStackParamList = {
  onboarding: undefined;
  "phone-input": undefined;
  "otp-verify": { phoneNumber: string };
  password: {
    phoneNumber: string;
    isNewUser: boolean;
  };
};

export type TabStackParamList = {
  index: undefined;
  profile: undefined;
  settings: undefined;
};
