import GoBackButton from "@/components/base/GoBackButton";
import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import { strings } from "@/constants/strings";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, TextInput } from "react-native";

export default function OTPScreen() {
  const router = useRouter();
  const { phoneNumber, setUser } = useAuthStore();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      Alert.alert(strings.error, strings.enterValidOtp);
      return;
    }

    setLoading(true);
    try {
      // Here you would verify OTP with Firebase
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // onVerify(otpString);
      router.push("/(auth)/password");
    } catch (error) {
      Alert.alert(strings.error, strings.invalidOtp);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    setResendTimer(60);
    // onResend();
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

        <ThemedView className="flex-row justify-center space-x-3 gap-3">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              className="w-12 border border-border rounded-lg text-center text-lg font-semibold text-foreground bg-input"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
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
          loading={loading}
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
