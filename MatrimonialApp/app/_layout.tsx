import { Stack } from "expo-router";
import { useEffect } from "react";
import * as ScreenCapture from "expo-screen-capture";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  useEffect(() => {
    const enableSecurity = async () => {
      try {
        // Only mobile devices वर block कर
        if (Platform.OS === "android" || Platform.OS === "ios") {
          await ScreenCapture.preventScreenCaptureAsync();
        }
      } catch (error) {
        console.log("Screen capture block error:", error);
      }
    };

    enableSecurity();

    return () => {
      const disableSecurity = async () => {
        try {
          if (Platform.OS === "android" || Platform.OS === "ios") {
            await ScreenCapture.allowScreenCaptureAsync();
          }
        } catch (error) {
          console.log("Allow screen capture error:", error);
        }
      };

      disableSecurity();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}