import { ThemedButton } from "@/components/base/ThemedButton";
import ThemedPasswordInput from "@/components/base/ThemedPasswordInput";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedTextInput } from "@/components/base/ThemedTextInput";
import { ThemedView } from "@/components/base/ThemedView";
import { strings } from "@/constants/strings";
import { useAuthSession } from "@/stores/auth";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { validatePhoneNumber } from "@/utils/validate";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthSession();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!phoneNumber.trim()) {
      showErrorToast(strings.alertMissingPhone);
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      showErrorToast(strings.errorInvalidPhone);
      return;
    }

    if (!password.trim()) {
      showErrorToast(strings.alertMissingPassword);
      return;
    }

    try {
      await login(phoneNumber, password);
      showSuccessToast(strings.loginSuccess);
      router.replace("/");
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };

  const handleRegister = () => {
    router.push("/(auth)/phone-input");
  };

  const handleGoogleLogin = async () => {
    // TODO: Implement Google login
    showErrorToast(strings.featureComingSoon);
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  return (
    <ThemedView color="background" className="flex-1 px-6 justify-center">
      <ThemedView className="mb-8">
        <ThemedText type="title" className="text-center mb-4">
          {strings.loginTitle}
        </ThemedText>
        <ThemedText color="muted-foreground" className="text-center">
          {strings.loginSubtitle}
        </ThemedText>
      </ThemedView>

      <ThemedView className="gap-4 mb-8">
        <ThemedView>
          <ThemedText type="defaultSemiBold" className="mb-2">
            {strings.phoneInputLabel}
          </ThemedText>
          <ThemedTextInput
            placeholder={strings.phoneInputPlaceholder}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoComplete="tel"
          />
        </ThemedView>

        <ThemedView>
          <ThemedText type="defaultSemiBold" className="mb-2">
            {strings.passwordLabel}
          </ThemedText>
          <ThemedPasswordInput
            password={password}
            setPassword={setPassword}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            placeholder={strings.passwordPlaceholder}
          />
        </ThemedView>

        <TouchableOpacity onPress={handleForgotPassword} className="self-end">
          <ThemedText color="primary" className="text-sm">
            {strings.forgotPassword}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView className="gap-3">
        <ThemedButton
          title={strings.loginButton}
          onPress={handleLogin}
          loading={isLoading}
          size="lg"
        />

        <ThemedButton
          title={strings.loginWithGoogle}
          onPress={handleGoogleLogin}
          variant="outline"
          size="lg"
        />

        <ThemedView className="flex-row justify-center items-center mt-6">
          <ThemedText color="muted-foreground">{strings.noAccount}</ThemedText>
          <TouchableOpacity onPress={handleRegister} className="ml-1">
            <ThemedText color="primary" type="defaultSemiBold">
              {strings.registerNow}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
