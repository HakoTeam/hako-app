import ThemedToast from "@/components/base/ThemedToast";

export const toastConfig = {
  success: (props: any) => <ThemedToast {...props} type="success" />,
  error: (props: any) => <ThemedToast {...props} type="error" />,
  info: (props: any) => <ThemedToast {...props} type="info" />,
  warn: (props: any) => <ThemedToast {...props} type="warn" />,
};
