import * as LocalAuthentication from "expo-local-authentication";


// Custom hook to handle biometric authentication
// Its reusable in all places where biometric auth is needed
// Callbacks:
// - success: called when biometric auth is successful
// - failure: called when biometric auth fails
// - noBio: called when device has no biometric hardware
// - message: optional custom message for the biometric prompt
export default async function useBiometric({
  success,
  failure,
  noBio,
  message,
}: {
  success: () => void;
  failure?: () => void;
  noBio?: () => void;
  message?: string;
}) {
  // show biometric prompt
  try {
    const has = await LocalAuthentication.hasHardwareAsync();
    const promptMessage = message || "Use biometric to unlock";
    if (has) {
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: promptMessage,
      });
      if (res.success) {
        success();
      } else {
        failure ? failure() : console.log("Biometric failed");
      }
    } else {
      noBio ? noBio() : console.log("No biometric hardware");
    }
  } catch (e) {
    console.log("Biometric error", e);
    failure ? failure() : console.log("Biometric failed");
  }
}
