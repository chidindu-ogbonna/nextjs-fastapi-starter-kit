export const firebaseAuthErrors: { [key: string]: string } = {
  "auth/claims-too-large":
    "The custom user claims exceed the maximum allowed size.",
  "auth/email-already-exists":
    "This email is already in use. Please use a different email.",
  "auth/email-already-in-use":
    "This email is already in use. Please use a different email.",
  "auth/id-token-expired": "Your session has expired. Please sign in again.",
  "auth/id-token-revoked":
    "Your session has been revoked. Please sign in again.",
  "auth/insufficient-permission":
    "You don't have permission to perform this action.",
  "auth/internal-error":
    "An unexpected error occurred. Please try again later.",
  "auth/invalid-argument":
    "Invalid input provided. Please check your details and try again.",
  "auth/invalid-claims": "Invalid custom user claims provided.",
  "auth/invalid-continue-uri": "The continue URL is invalid.",
  "auth/invalid-creation-time": "Invalid account creation time.",
  "auth/invalid-credential":
    "Invalid email or password. Please check your details and try again.",
  "auth/invalid-disabled-field":
    "Invalid value for the disabled user property.",
  "auth/invalid-display-name":
    "Invalid display name. Please provide a non-empty string.",
  "auth/invalid-dynamic-link-domain":
    "The provided dynamic link domain is not authorized.",
  "auth/invalid-email": "The email address is badly formatted.",
  "auth/invalid-email-verified": "Invalid email verified status.",
  "auth/invalid-password":
    "The password must be a string with at least 6 characters.",
  "auth/invalid-phone-number":
    "The phone number is invalid. Please enter a valid phone number.",
  "auth/invalid-photo-url":
    "The photo URL is invalid. Please provide a valid URL.",
  "auth/invalid-uid":
    "The user ID must be a non-empty string with at most 128 characters.",
  "auth/invalid-user-import": "The user record to import is invalid.",
  "auth/maximum-user-count-exceeded":
    "The maximum number of allowed users has been exceeded.",
  "auth/missing-android-pkg-name":
    "An Android Package Name must be provided for Android app installation.",
  "auth/missing-continue-uri":
    "A continue URL must be provided in the request.",
  "auth/missing-ios-bundle-id":
    "An iOS Bundle ID must be provided for iOS app installation.",
  "auth/missing-uid": "A user ID is required for this operation.",
  "auth/operation-not-allowed":
    "This sign-in method is not allowed. Please contact support.",
  "auth/phone-number-already-exists":
    "This phone number is already in use. Please use a different number.",
  "auth/project-not-found":
    "No Firebase project found. Please check your configuration.",
  "auth/reserved-claims":
    "One or more custom user claims are reserved and cannot be used.",
  "auth/session-cookie-expired":
    "Your session has expired. Please sign in again.",
  "auth/session-cookie-revoked":
    "Your session has been revoked. Please sign in again.",
  "auth/too-many-requests": "Too many requests. Please try again later.",
  "auth/uid-already-exists": "The provided user ID is already in use.",
  "auth/unauthorized-continue-uri":
    "The continue URL domain is not whitelisted.",
  "auth/user-not-found": "No user found with the given credentials."
};

export function getFirebaseAuthErrorMessage(errorCode: string): string {
  return (
    firebaseAuthErrors[errorCode] ||
    "An unknown error occurred. Please try again."
  );
}
