export const formatPhoneNumber = (
  phoneNumber: string,
  countryCode: string = "+84"
): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "").replace(/^0+/, "");

  // If it doesn't start with country code, add it
  if (!phoneNumber.startsWith("+")) {
    return `${countryCode}${cleaned}`;
  }

  return phoneNumber;
};
