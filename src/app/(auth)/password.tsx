import GoBackButton from "@/components/base/GoBackButton";
import { ThemedButton } from "@/components/base/ThemedButton";
import ThemedPasswordInput from "@/components/base/ThemedPasswordInput";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedTextInput } from "@/components/base/ThemedTextInput";
import { ThemedView } from "@/components/base/ThemedView";
import { storageKeys } from "@/constants/storage";
import { strings } from "@/constants/strings";
import { setStorageItem } from "@/services/storage";
import { useAuthSession } from "@/stores/auth";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { getPasswordStrength, getStrengthText } from "@/utils/validate";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function PasswordScreen() {
  const router = useRouter();
  const { phoneNumber, user, login, register, isLoading } = useAuthSession();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isNewUser = !user;

  const handleSubmit = async () => {
    if (!password.trim()) {
      showErrorToast(strings.alertMissingPassword);
      return;
    }

    if (isNewUser) {
      if (password.length < 8) {
        showErrorToast(strings.alertPasswordTooShort);
        return;
      }
      if (password !== confirmPassword) {
        showErrorToast(strings.alertPasswordMismatch);
        return;
      }
    }

    try {
      if (isNewUser) {
        await register(phoneNumber, password);
        showSuccessToast(strings.registerSuccess);
        setStorageItem(storageKeys.userPhone, phoneNumber);
      } else {
        await login(phoneNumber, password);
        showSuccessToast(strings.loginSuccess);
        setStorageItem(storageKeys.userPhone, phoneNumber);
      }

      router.replace("/");
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };

  const strengthInfo = getPasswordStrength(password);
  const strengthDisplay = getStrengthText(strengthInfo);

  return (
    <ThemedView color="background" className="flex-1 px-6 justify-center">
      <GoBackButton steps={2} />

      <ThemedView className="mb-8">
        <ThemedText type="title" className="text-center mb-4">
          {isNewUser
            ? strings.passwordTitleNewUser
            : strings.passwordTitleExistingUser}
        </ThemedText>
        <ThemedText color="muted-foreground" className="text-center">
          {isNewUser
            ? strings.passwordSubtitleNewUser
            : `${strings.passwordSubtitleExistingUser} ${phoneNumber}`}
        </ThemedText>
      </ThemedView>

      <ThemedView className="space-y-4 mb-8">
        <ThemedView>
          <ThemedText type="defaultSemiBold" className="mb-2">
            {strings.passwordLabel}
          </ThemedText>
          <ThemedPasswordInput
            password={password}
            setPassword={setPassword}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
          {isNewUser && password.length > 0 && (
            <ThemedView className="mt-2">
              <ThemedText className="text-sm" color={strengthDisplay.color}>
                {strings.passwordStrengthLabel} {strengthDisplay.text}
              </ThemedText>
              <ThemedView className="flex-row mt-1 space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <ThemedView
                    key={level}
                    className={`flex-1 h-1 rounded ${
                      level <= strengthInfo
                        ? strengthInfo <= 1
                          ? "bg-destructive"
                          : strengthInfo <= 3
                            ? "bg-yellow-500"
                            : "bg-primary"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </ThemedView>
            </ThemedView>
          )}
        </ThemedView>

        {isNewUser && (
          <>
            <ThemedView className="mt-4">
              <ThemedText type="defaultSemiBold" className="mb-2">
                {strings.passwordConfirmLabel}
              </ThemedText>
              <ThemedTextInput
                placeholder={strings.passwordConfirmPlaceholder}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
              />
            </ThemedView>

            <ThemedView className="mt-4 gap-2">
              <ThemedText color="muted-foreground">
                {strings.passwordRequirements}:
              </ThemedText>
              <ThemedText color="muted-foreground">
                • {strings.minimumLength}
              </ThemedText>
              <ThemedText color="muted-foreground">
                • {strings.includeUppercase}
              </ThemedText>
              <ThemedText color="muted-foreground">
                • {strings.includeNumbers}
              </ThemedText>
            </ThemedView>
          </>
        )}
      </ThemedView>

      <ThemedButton
        title={
          isNewUser
            ? strings.passwordButtonSubmitNewUser
            : strings.passwordButtonSubmitExistingUser
        }
        onPress={handleSubmit}
        loading={isLoading}
        size="lg"
      />
    </ThemedView>
  );
}
