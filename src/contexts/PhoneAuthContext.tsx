import { storageKeys } from "@/constants/storage";
import { strings } from "@/constants/strings";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "@/services/storage";
import { formatPhoneNumber } from "@/utils/phone";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import {
  deleteUser,
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  signOut,
  verifyPhoneNumber,
} from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface PhoneAuthContextType {
  // State
  isLoading: boolean;
  error: string | null;
  phoneNumber: string;

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

interface PhoneAuthenticationProps {
  children: ReactNode;
}

export const PhoneAuthenticationProvider: React.FC<
  PhoneAuthenticationProps
> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

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
        removeStorageItem(storageKeys.activeOTPSession);
        break;
      case "auth/missing-verification-code":
        errorMessage = strings.enterValidOtp;
        break;
      case "auth/session-expired":
        errorMessage = strings.otpExpired;
        removeStorageItem(storageKeys.activeOTPSession);
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
      const formattedPhone = formatPhoneNumber(phoneNumber);
      const auth = getAuth();

      // Sign out any existing user
      if (auth.currentUser) {
        await signOut(auth);
      }

      // Clear previous session
      removeStorageItem(storageKeys.verificationId);
      removeStorageItem(storageKeys.activeOTPSession);

      console.log("Sending OTP to:", formattedPhone, Date.now());

      // Send OTP using PhoneAuthProvider
      const confirmationResult = await verifyPhoneNumber(
        auth,
        formattedPhone,
        60
      );
      console.log("verify phone number completed:", Date.now());

      if (!confirmationResult) {
        showErrorToast(strings.alertAuthInvalidPhoneNumber);
        setIsLoading(false);
        return false;
      }

      // Extract verification ID from confirmation result
      const verificationId = confirmationResult.verificationId;

      if (!verificationId) {
        throw new Error("Failed to get verification ID");
      }

      setStorageItem(storageKeys.verificationId, verificationId);
      setPhoneNumber(formattedPhone);
      setStorageItem(storageKeys.activeOTPSession, "true");
      setIsLoading(false);

      showSuccessToast(strings.otpSent);
      console.log("OTP sent successfully to:", formattedPhone, verificationId);
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
    const verificationId = await getStorageItem(storageKeys.verificationId);
    console.log("Retrieved verification ID:", verificationId);

    if (!verificationId) {
      console.error("No verification ID available");
      showErrorToast(strings.noOtpSession);
      return { verified: false };
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Verifying OTP:", otp);

      // Create phone credential using verification ID and OTP
      const phoneCredential = PhoneAuthProvider.credential(verificationId, otp);

      // Sign in with the credential to verify it
      const auth = getAuth();
      const result = await signInWithCredential(auth, phoneCredential);

      if (result && result.user) {
        console.log(
          "OTP verified successfully for:",
          result.user.uid,
          result.user.phoneNumber
        );

        // Store the verified phone number
        const verifiedPhoneNumber = result.user.phoneNumber || phoneNumber;

        // Immediately delete the user since we only want to verify the phone number
        await deleteUser(result.user);

        // Clear OTP session
        removeStorageItem(storageKeys.verificationId);
        removeStorageItem(storageKeys.activeOTPSession);
        setIsLoading(false);

        showSuccessToast(strings.otpVerified);

        return {
          verified: true,
          phoneNumber: verifiedPhoneNumber,
        };
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
    removeStorageItem(storageKeys.verificationId);
    removeStorageItem(storageKeys.activeOTPSession);
    setPhoneNumber("");
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value: PhoneAuthContextType = {
    isLoading,
    error,
    phoneNumber,
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
