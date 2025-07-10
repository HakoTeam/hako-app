import GoBackButton from "@/components/base/GoBackButton";
import { ThemedButton } from "@/components/base/ThemedButton";
import ThemedPasswordInput from "@/components/base/ThemedPasswordInput";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedTextInput } from "@/components/base/ThemedTextInput";
import { ThemedView } from "@/components/base/ThemedView";
import { strings } from "@/constants/strings";
import { useAuthSession } from "@/stores/auth";
import { showErrorToast } from "@/utils/toast";
import { getPasswordStrength, getStrengthText } from "@/utils/validate";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function PasswordScreen() {
  const router = useRouter();
  const { phoneNumber, user } = useAuthSession();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

    setLoading(true);
    try {
      // Authenticate with backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.replace("/");
    } catch (error) {
      showErrorToast(
        isNewUser
          ? strings.alertCreateAccountFailed
          : strings.alertInvalidPassword
      );
    } finally {
      setLoading(false);
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
              <ThemedText className="text-muted-foreground">
                {strings.passwordRequirements}:
              </ThemedText>
              <ThemedText className="text-muted-foreground">
                • {strings.minimumLength}
              </ThemedText>
              <ThemedText className="text-muted-foreground">
                • {strings.includeUppercase}
              </ThemedText>
              <ThemedText className="text-muted-foreground">
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
        loading={loading}
        size="lg"
      />
    </ThemedView>
  );
}
