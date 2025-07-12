import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedTextInput } from "@/components/base/ThemedTextInput";
import { ThemedView } from "@/components/base/ThemedView";
import { strings } from "@/constants/strings";
import { usePhoneAuth } from "@/contexts/PhoneAuthContext";
import { useAuthSession } from "@/stores/auth";
import { showErrorToast } from "@/utils/toast";
import { validatePhoneNumber } from "@/utils/validate";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function PhoneInputScreen() {
  const router = useRouter();
  const { phoneNumber, setPhoneNumber } = useAuthSession();
  const [phone, setPhone] = useState("");
  const { sendOTP, isLoading: loading, clearError } = usePhoneAuth();

  useEffect(() => {
    if (phoneNumber && !phone) {
      setPhone(phoneNumber);
    }
  }, [phoneNumber]);

  useEffect(() => {
    clearError();
  }, []);

  const handleContinue = async () => {
    if (!phone.trim()) {
      showErrorToast(strings.alertMissingPhoneNumber);
      return;
    }

    if (!validatePhoneNumber(phone)) {
      showErrorToast(strings.alertInvalidPhoneNumber);
      return;
    }

    const success = await sendOTP(phone);
    if (success) {
      setPhoneNumber(phone);
      router.push("/(auth)/otp-verify");
    }
  };

  return (
    <ThemedView color="background" className="flex-1 px-6 justify-center">
      <ThemedView className="mb-8">
        <ThemedText type="title" className="text-center mb-4">
          {strings.phoneInputTitle}
        </ThemedText>
        <ThemedText color="muted-foreground" className="text-center">
          {strings.phoneInputSubtitle}
        </ThemedText>
      </ThemedView>

      <ThemedView className="mb-8">
        <ThemedText type="defaultSemiBold" className="mb-2">
          {strings.phoneInputLabel}
        </ThemedText>
        <ThemedTextInput
          placeholder={strings.phoneInputPlaceholder}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoComplete="tel"
        />
      </ThemedView>

      <ThemedView className="space-y-4">
        <ThemedButton
          title={strings.phoneInputButtonContinue}
          onPress={handleContinue}
          loading={loading}
          size="lg"
        />

        {/* {onGoogleLogin && ( */}
        <>
          <ThemedView className="flex-row items-center my-4">
            <ThemedView className="flex-1 h-px bg-border" />
            <ThemedText color="muted-foreground" className="mx-4">
              {strings.phoneInputOrText}
            </ThemedText>
            <ThemedView className="flex-1 h-px bg-border" />
          </ThemedView>

          <ThemedButton
            title={strings.phoneInputButtonContinueWithGoogle}
            variant="outline"
            onPress={() => {}}
            size="lg"
          />
        </>
        {/* )} */}
      </ThemedView>
    </ThemedView>
  );
}
