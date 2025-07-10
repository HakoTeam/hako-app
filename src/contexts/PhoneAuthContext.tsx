import { strings } from "@/constants/strings";
import { formatPhoneNumber } from "@/utils/phone";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

interface PhoneAuthContextType {
  // State
  isLoading: boolean;
  error: string | null;
  phoneNumber: string;
  hasActiveOTPSession: boolean;

  // Methods
  sendOTP: (phoneNumber: string) => Promise<boolean>;
  verifyOTP: (
    otp: string
  ) => Promise<{ verified: boolean; phoneNumber?: string }>;
  resendOTP: () => Promise<boolean>;
  clearOTPSession: () => void;
  clearError: () => void;
}

const PhoneAuthContext = createContext<PhoneAuthContextType | undefined>(
  undefined
);

interface PhoneAuthProviderProps {
  children: ReactNode;
}

export const PhoneAuthProvider: React.FC<PhoneAuthProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hasActiveOTPSession, setHasActiveOTPSession] = useState(false);

  const otpConfirmationRef =
    useRef<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const handleAuthError = (error: any) => {
    let errorMessage = "";

    switch (error.code) {
      case "auth/invalid-phone-number":
        errorMessage = strings.alertAuthInvalidPhoneNumber;
        break;
      case "auth/too-many-requests":
        errorMessage = strings.tooManyRequests;
        break;
      case "auth/invalid-verification-code":
        errorMessage = strings.invalidOtp;
        break;
      case "auth/code-expired":
        errorMessage = strings.otpExpired;
        // Clear OTP session when code expires
        otpConfirmationRef.current = null;
        setHasActiveOTPSession(false);
        break;
      case "auth/missing-verification-code":
        errorMessage = strings.enterValidOtp;
        break;
      case "auth/session-expired":
        errorMessage = strings.noOtpSession;
        otpConfirmationRef.current = null;
        setHasActiveOTPSession(false);
        break;
      default:
        errorMessage = error.message || strings.genericError;
    }

    showErrorToast(errorMessage);
    setError(errorMessage);
  };

  const sendOTP = async (phoneNumber: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Format phone number
      const formattedPhone = formatPhoneNumber(phoneNumber);
      const auth = getAuth();

      // Clear previous OTP session
      otpConfirmationRef.current = null;
      setHasActiveOTPSession(false);

      const confirmationResult =
        await auth.signInWithPhoneNumber(formattedPhone);

      // Lưu vào ref
      otpConfirmationRef.current = confirmationResult;
      setPhoneNumber(formattedPhone);
      setHasActiveOTPSession(true);
      setIsLoading(false);

      showSuccessToast(strings.otpSent);
      console.log("OTP sent successfully to:", formattedPhone);
      return true;
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      handleAuthError(error);
      setIsLoading(false);
      return false;
    }
  };

  const verifyOTP = async (
    otp: string
  ): Promise<{ verified: boolean; phoneNumber?: string }> => {
    const otpConfirmation = otpConfirmationRef.current;

    console.log("Current OTP state:", {
      hasConfirmation: !!otpConfirmation,
      phoneNumber,
      hasActiveSession: hasActiveOTPSession,
    });

    if (!otpConfirmation) {
      console.error("No OTP confirmation available");
      showErrorToast(strings.noOtpSession);
      return { verified: false };
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await otpConfirmation.confirm(otp);
      const user = result?.user;

      if (user) {
        console.log("OTP verified successfully for:", user.phoneNumber);

        // Delete the temporary Firebase user (if you don't want to keep it)
        await user.delete();

        // Clear OTP session after successful verification
        otpConfirmationRef.current = null;
        setHasActiveOTPSession(false);
        setIsLoading(false);

        showSuccessToast(strings.otpVerified);
        return { verified: true, phoneNumber };
      }

      setIsLoading(false);
      return { verified: false };
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      handleAuthError(error);
      setIsLoading(false);
      return { verified: false };
    }
  };

  const resendOTP = async (): Promise<boolean> => {
    if (!phoneNumber) {
      showErrorToast(strings.noPhoneNumber);
      return false;
    }

    console.log("Resending OTP to:", phoneNumber);
    return await sendOTP(phoneNumber);
  };

  const clearOTPSession = () => {
    otpConfirmationRef.current = null;
    setPhoneNumber("");
    setHasActiveOTPSession(false);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value: PhoneAuthContextType = {
    isLoading,
    error,
    phoneNumber,
    hasActiveOTPSession,
    sendOTP,
    verifyOTP,
    resendOTP,
    clearOTPSession,
    clearError,
  };

  return (
    <PhoneAuthContext.Provider value={value}>
      {children}
    </PhoneAuthContext.Provider>
  );
};

export const usePhoneAuth = (): PhoneAuthContextType => {
  const context = useContext(PhoneAuthContext);
  if (!context) {
    throw new Error("usePhoneAuth must be used within a PhoneAuthProvider");
  }
  return context;
};
