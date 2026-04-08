import { useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      checkAuth();
    }, 50); // small delay to avoid web hydration flicker

    return () => clearTimeout(timer);
  }, []);

const checkAuth = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");

    console.log("TOKEN:", token);
    console.log("ROLE:", role);

    if (!token) {
      router.replace("/(auth)/login");
      return;
    }

    // normalize role (IMPORTANT FIX)
    const userRole = role?.toUpperCase();

    if (userRole === "ADMIN") {
      router.replace("/admin/dashboard");
      return;
    }

    if (userRole === "USER") {
      router.replace("/(tabs)");
      return;
    }

    // fallback
    router.replace("/(auth)/login");
  } catch (error) {
    console.log("Auth check error:", error);
    router.replace("/(auth)/login");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bhagyabandhan</Text>
      <Text style={styles.subtitle}>Finding your perfect life partner</Text>
      <ActivityIndicator
        size="large"
        color="#C9A227"
        style={{ marginTop: 24 }}
      />
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