import { Stack } from "expo-router";
import { useEffect } from "react";
import * as ScreenCapture from "expo-screen-capture";
import { Alert, AppState, View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  useEffect(() => {
    // Android वर screenshots / recording block
    ScreenCapture.preventScreenCaptureAsync();

    // iOS / Android detection (जर user try करेल)
    const subscription = ScreenCapture.addScreenshotListener(() => {
      Alert.alert(
        "Security Alert",
        "Screenshots are not allowed in this app for privacy reasons."
      );
    });

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}