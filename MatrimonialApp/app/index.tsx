import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");

      if (!token || !userData) {
        router.replace("/(auth)/login");
        return;
      }

      const user = JSON.parse(userData);

      if (user.role === "ADMIN") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/(tabs)");
      }
    } catch (error) {
      router.replace("/(auth)/login");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F3EA",
      }}
    >
      <ActivityIndicator size="large" color="#7A0F1E" />
    </View>
  );
}