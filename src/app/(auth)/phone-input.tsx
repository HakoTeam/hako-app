import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedTextInput } from "@/components/base/ThemedTextInput";
import { ThemedView } from "@/components/base/ThemedView";
import { strings } from "@/constants/strings";
import { useAuthStore } from "@/stores/auth";
import { showErrorToast } from "@/utils/toast";
import { validatePhoneNumber } from "@/utils/validate";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function PhoneInputScreen() {
  const router = useRouter();
  const { setPhoneNumber } = useAuthStore();
  const [phoneNumber, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!phoneNumber.trim()) {
      showErrorToast(strings.alertMissingPhoneNumber);
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      showErrorToast(strings.alertInvalidPhoneNumber);
      return;
    }

    setLoading(true);
    try {
      // Here you would typically send OTP via Firebase
      // For now, we'll simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPhoneNumber(phoneNumber);
      router.push("/(auth)/otp-verify");
    } catch (error) {
      showErrorToast(strings.alertFailedToSendOTP);
    } finally {
      setLoading(false);
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
          value={phoneNumber}
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
