import { Stack, router, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function AdminLayout() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const segments = useSegments();

 useEffect(() => {
  checkAdminAccess();
}, [segments]);

const checkAdminAccess = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");

    const userRole = role?.toUpperCase();

    if (!token) {
      router.replace("/(auth)/login");
      return;
    }

    if (userRole !== "ADMIN") {
      router.replace("/(tabs)");
      return;
    }
  } catch (error) {
    console.log("Admin Layout Error:", error);
    router.replace("/(auth)/login");
  } finally {
    setCheckingAuth(false);
  }
};

  if (checkingAuth) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF8F2",
        }}
      >
        <ActivityIndicator size="large" color="#7A1120" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}