/**
 * Replace if it contains the '+' symbol.
 * @param {string} country_code - The country code to check and modify.
 * @returns {string} - The country code without the '+' symbol, if present.
 */
export const removePlusFromCountryCode = (country_code) => {
  return country_code.startsWith('+') ? country_code.slice(1) : country_code;
};

/**
 * Check if OTP has expired or not.
 * -- Default Time Limit for OTP is 5 minutes.
 * @param {string} createdAt - The datetime when the OTP was created.
 * @param {string} code - The OTP code (not used here, but can be validated for other purposes).
 * @returns {boolean} - Returns true if OTP is expired, otherwise false.
 */
export const isOtpExpired = (createdAt, code) => {
  const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  const otpCreationTime = new Date(createdAt).getTime();
  return (new Date().getTime() - otpCreationTime) > expirationTime;
};
