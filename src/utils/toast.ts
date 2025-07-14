import Toast from "react-native-toast-message";

export interface ShowToastOptions {
  type?: "success" | "error" | "info" | "warn";
  text1?: string;
  text2?: string;
  backgroundColor?: string;
  textColor?: string;
  icon?: string;
  iconColor?: string;
  duration?: number;
}

export const showToast = (options: ShowToastOptions) => {
  const {
    type = "success",
    text1,
    text2,
    backgroundColor,
    textColor,
    icon,
    iconColor,
    duration = 3000,
  } = options;

  Toast.show({
    type,
    text1,
    text2,
    visibilityTime: duration,
    props: {
      backgroundColor,
      textColor,
      icon,
      iconColor,
    },
  });
};

export const showSuccessToast = (
  description?: string,
  title?: string,
  duration?: number
) => {
  showToast({ type: "success", text1: title, text2: description, duration });
};

export const showErrorToast = (
  description?: string,
  title?: string,
  duration?: number
) => {
  showToast({ type: "error", text1: title, text2: description, duration });
};

export const showInfoToast = (
  description?: string,
  title?: string,
  duration?: number
) => {
  showToast({ type: "info", text1: title, text2: description, duration });
};

export const showWarnToast = (
  description?: string,
  title?: string,
  duration?: number
) => {
  showToast({ type: "warn", text1: title, text2: description, duration });
};
