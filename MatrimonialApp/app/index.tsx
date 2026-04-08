import { useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
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

      if (user?.role === "ADMIN") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.log("Auth check error:", error);
      router.replace("/(auth)/login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bhagyabandhan</Text>
      <Text style={styles.subtitle}>Finding your perfect life partner</Text>
      <ActivityIndicator size="large" color="#C9A227" style={{ marginTop: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EC",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1C1C1C",
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#8B6F47",
    textAlign: "center",
  },
});