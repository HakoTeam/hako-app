import GoBackButton from "@/components/base/GoBackButton";
import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import { storageKeys } from "@/constants/storage";
import { strings } from "@/constants/strings";
import { usePhoneAuth } from "@/contexts/PhoneAuthContext";
import { getStorageItem } from "@/services/storage";
import { useAuthSession } from "@/stores/auth";
import { showErrorToast } from "@/utils/toast";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";

export default function OTPScreen() {
  const router = useRouter();
  const { phoneNumber } = useAuthSession();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [fullOtp, setFullOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const hiddenInputRef = useRef<TextInput | null>(null);
  const {
    verifyOTP,
    resendOTP,
    isLoading: loading,
    clearError,
  } = usePhoneAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    clearError();
  }, []);

  // Auto-verify when OTP is complete
  // useEffect(() => {
  //   const otpString = otp.join("");
  //   if (otpString.length === 6 && !isVerifying) {
  //     handleVerify();
  //   }
  // }, [otp, isVerifying]);

  // Handle pasted OTP
  useEffect(() => {
    if (fullOtp.length === 6) {
      const otpArray = fullOtp.split("");
      setOtp(otpArray);
      setFullOtp(""); // Clear the hidden input
    }
  }, [fullOtp]);

  // Redirect if no active OTP session
  useEffect(() => {
    async function checkOTPSession() {
      const activeOTPSession = await getStorageItem(
        storageKeys.activeOTPSession
      );
      console.log(activeOTPSession);

      const checkSession = activeOTPSession === "true";
      if (!checkSession) {
        router.push("/(auth)/phone-input");
      }
    }
    checkOTPSession();
  }, [router]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (isVerifying) return; // Prevent multiple simultaneous verifications

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      showErrorToast(strings.enterValidOtp);
      return;
    }

    setIsVerifying(true);

    try {
      console.log("Verifying OTP:", otpString);

      const { verified, phoneNumber: verifiedPhone } =
        await verifyOTP(otpString);

      if (verified) {
        console.log(
          "OTP verification successful, navigating to password screen"
        );
        router.push("/(auth)/password");
      }
    } catch (error) {
      console.error("Verification error:", error);
      showErrorToast(strings.genericError);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    const success = await resendOTP();
    if (success) {
      setResendTimer(60);
      setOtp(["", "", "", "", "", ""]);
      setFullOtp("");
      setIsVerifying(false);
      inputRefs.current[0]?.focus();
    }
  };

  const handlePaste = (pastedText: string) => {
    const cleanedText = pastedText.replace(/\D/g, ""); // Remove non-digits
    if (cleanedText.length === 6) {
      const otpArray = cleanedText.split("");
      setOtp(otpArray);
      return true;
    }
    return false;
  };

  return (
    <ThemedView color="background" className="flex-1 px-6 justify-center">
      <GoBackButton />
      <ThemedView className="mb-8">
        <ThemedText type="title" className="text-center mb-4">
          {strings.otpTitle}
        </ThemedText>
        <ThemedText color="muted-foreground" className="text-center">
          {strings.otpSubtitle} {phoneNumber}
        </ThemedText>
      </ThemedView>

      <ThemedView className="mb-8">
        <ThemedText type="defaultSemiBold" className="mb-4 text-center">
          {strings.otpInputLabel}
        </ThemedText>
        <TextInput
          ref={hiddenInputRef}
          value={fullOtp}
          onChangeText={setFullOtp}
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 1,
            height: 1,
            opacity: 0,
          }}
          keyboardType="numeric"
          textContentType="oneTimeCode" // iOS auto-fill
          autoComplete="sms-otp" // Android auto-fill
          maxLength={6}
        />

        <ThemedView className="flex-row justify-center space-x-3 gap-3">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              className="w-12 border border-border rounded-lg text-center text-lg font-semibold text-foreground bg-input"
              value={digit}
              onChangeText={(value) => {
                if (value.length > 1) {
                  if (handlePaste(value)) {
                    return;
                  }
                }
                handleOtpChange(value, index);
              }}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView className="gap-3">
        <ThemedButton
          title={strings.otpContinue}
          onPress={handleVerify}
          loading={loading || isVerifying}
          size="lg"
        />

        <ThemedView className="flex-row justify-between items-center">
          <ThemedText color="muted-foreground">
            {strings.noReceivedOtp}
          </ThemedText>
          <ThemedButton
            title={
              resendTimer > 0
                ? `${strings.otpResendIn} ${resendTimer}s`
                : strings.otpResend
            }
            variant="outline"
            onPress={handleResend}
            disabled={resendTimer > 0}
            className="p-0 bg-transparent border-0"
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
