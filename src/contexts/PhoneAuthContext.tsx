import { strings } from "@/constants/strings";
import { formatPhoneNumber } from "@/utils/phone";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hasActiveOTPSession, setHasActiveOTPSession] = useState(false);

  const otpConfirmationRef =
    useRef<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const authListenerRef = useRef<(() => void) | null>(null);
  const isAutoVerifyingRef = useRef(false);
  const expectedPhoneNumberRef = useRef<string | null>(null);

  useEffect(() => {
    const auth = getAuth();

    // Clean up previous listener
    if (authListenerRef.current) {
      authListenerRef.current();
      authListenerRef.current = null;
    }

    // Set up auth state listener when we have an active OTP session
    if (hasActiveOTPSession) {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user && user.phoneNumber) {
          console.log("User auto-verified by Android:", user.phoneNumber);

          // Check if the auto-verified phone number matches what we expect
          if (
            expectedPhoneNumberRef.current &&
            user.phoneNumber !== expectedPhoneNumberRef.current
          ) {
            console.warn("Auto-verified phone number doesn't match expected:", {
              expected: expectedPhoneNumberRef.current,
              actual: user.phoneNumber,
            });

            // Delete the user and show error
            try {
              await user.delete();
            } catch (deleteError) {
              console.warn("Error deleting temp user:", deleteError);
            }

            showErrorToast(
              "Phone number verification mismatch. Please try again."
            );
            clearOTPSession();
            return;
          }

          // Set flag to prevent race condition
          isAutoVerifyingRef.current = true;

          // Delete the temporary Firebase user (if you don't want to keep it)
          try {
            await user.delete();
          } catch (deleteError) {
            console.warn("Error deleting temp user:", deleteError);
          }

          // Clear OTP session
          otpConfirmationRef.current = null;
          setHasActiveOTPSession(false);
          setIsLoading(false);

          showSuccessToast(strings.otpVerified);

          // You can navigate here or return the verification result
          // For example: router.push('/dashboard');

          console.log("Auto-verification completed for:", user.phoneNumber);

          // Reset the flag after a short delay
          setTimeout(() => {
            isAutoVerifyingRef.current = false;
          }, 1000);
        }
      });

      authListenerRef.current = unsubscribe;
    }

    // Cleanup function
    return () => {
      if (authListenerRef.current) {
        authListenerRef.current();
        authListenerRef.current = null;
      }
    };
  }, [hasActiveOTPSession, router]);

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
        errorMessage = strings.otpExpired;
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
      if (auth.currentUser) {
        await auth.signOut();
      }

      // Clear previous OTP session
      otpConfirmationRef.current = null;
      if (authListenerRef.current) {
        authListenerRef.current();
        authListenerRef.current = null;
      }
      setHasActiveOTPSession(false);
      isAutoVerifyingRef.current = false;

      // Set the expected phone number for validation
      expectedPhoneNumberRef.current = formattedPhone;

      const confirmationResult =
        await auth.signInWithPhoneNumber(formattedPhone);

      // Store confirmation result
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
      expectedPhoneNumberRef.current = null;
      return false;
    }
  };

  const verifyOTP = async (
    otp: string
  ): Promise<{ verified: boolean; phoneNumber?: string }> => {
    // Check if auto-verification is in progress
    if (isAutoVerifyingRef.current) {
      console.log(
        "Auto-verification in progress, skipping manual verification"
      );
      return { verified: true, phoneNumber };
    }

    const otpConfirmation = otpConfirmationRef.current;

    console.log("Current OTP state:", {
      hasConfirmation: !!otpConfirmation,
      phoneNumber,
      hasActiveSession: hasActiveOTPSession,
      isAutoVerifying: isAutoVerifyingRef.current,
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

        // Verify the phone number matches what we expect
        if (
          expectedPhoneNumberRef.current &&
          user.phoneNumber !== expectedPhoneNumberRef.current
        ) {
          console.warn("Verified phone number doesn't match expected:", {
            expected: expectedPhoneNumberRef.current,
            actual: user.phoneNumber,
          });

          await user.delete();
          clearOTPSession();
          showErrorToast(
            "Phone number verification mismatch. Please try again."
          );
          return { verified: false };
        }

        await user.delete();

        // Clear OTP session after successful verification
        otpConfirmationRef.current = null;
        setHasActiveOTPSession(false);
        setIsLoading(false);
        expectedPhoneNumberRef.current = null;

        showSuccessToast(strings.otpVerified);
        return { verified: true, phoneNumber };
      }

      setIsLoading(false);
      return { verified: false };
    } catch (error: any) {
      console.error("Error verifying OTP:", error);

      // Special handling for session-expired - it might mean auto-verification happened
      if (error.code === "auth/session-expired") {
        // Check if user is currently authenticated
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser && currentUser.phoneNumber) {
          console.log(
            "Session expired but user is authenticated - auto-verification likely occurred"
          );

          // Verify the phone number matches what we expect
          if (
            expectedPhoneNumberRef.current &&
            currentUser.phoneNumber !== expectedPhoneNumberRef.current
          ) {
            console.warn("Auto-verified phone number doesn't match expected:", {
              expected: expectedPhoneNumberRef.current,
              actual: currentUser.phoneNumber,
            });

            try {
              await currentUser.delete();
            } catch (deleteError) {
              console.warn("Error deleting temp user:", deleteError);
            }

            clearOTPSession();
            showErrorToast(
              "Phone number verification mismatch. Please try again."
            );
            return { verified: false };
          }

          try {
            await currentUser.delete();
          } catch (deleteError) {
            console.warn("Error deleting temp user:", deleteError);
          }

          // Clear OTP session
          otpConfirmationRef.current = null;
          setHasActiveOTPSession(false);
          setIsLoading(false);
          expectedPhoneNumberRef.current = null;

          showSuccessToast(strings.otpVerified);
          return { verified: true, phoneNumber: currentUser.phoneNumber };
        }
      }

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
    // Clean up auth listener
    if (authListenerRef.current) {
      authListenerRef.current();
      authListenerRef.current = null;
    }

    otpConfirmationRef.current = null;
    setPhoneNumber("");
    setHasActiveOTPSession(false);
    setError(null);
    isAutoVerifyingRef.current = false;
    expectedPhoneNumberRef.current = null;
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
