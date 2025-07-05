import { strings } from "@/constants/strings";

export const validatePhoneNumber = (phone: string) => {
  // Vietnamese phone number validation
  const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

export const getPasswordStrength = (pwd: string) => {
  let strength = 0;
  if (pwd.length >= 8) strength++;
  if (/[A-Z]/.test(pwd)) strength++;
  if (/[a-z]/.test(pwd)) strength++;
  if (/[0-9]/.test(pwd)) strength++;
  if (/[^A-Za-z0-9]/.test(pwd)) strength++;
  return strength;
};

export const getStrengthText = (strength: number) => {
  switch (strength) {
    case 0:
    case 1:
      return { text: strings.passwordStrengthWeak, color: "destructive" };
    case 2:
    case 3:
      return { text: strings.passwordStrengthMedium, color: "#FFA500" };
    case 4:
    case 5:
      return { text: strings.passwordStrengthStrong, color: "primary" };
    default:
      return { text: strings.passwordStrengthWeak, color: "destructive" };
  }
};
