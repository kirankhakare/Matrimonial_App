import { Tabs, router, useSegments } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const insets = useSafeAreaInsets();
  const segments = useSegments();

  useEffect(() => {
    checkAuth();
  }, [segments]);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const role = await AsyncStorage.getItem("role");

      const userRole = role?.toUpperCase();

      // ❌ No token
      if (!token) {
        router.replace("/(auth)/login");
        return;
      }

      // 👑 Admin ला user tabs मध्ये येऊ देऊ नको
      if (userRole === "ADMIN") {
        router.replace("/admin/dashboard");
        return;
      }
    } catch (error) {
      console.log("Tab Auth Check Error:", error);
      router.replace("/(auth)/login");
    } finally {
      setCheckingAuth(false);
    }
  };

  if (checkingAuth) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#7A1120" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7A1120",
        tabBarInactiveTintColor: "#9A8C84",

        tabBarStyle: {
          position: "absolute",
          height: Platform.OS === "android" ? 70 + insets.bottom : 80,
          paddingTop: 10,
          paddingBottom:
            Platform.OS === "android" ? Math.max(insets.bottom, 12) : 12,
          borderTopWidth: 1,
          borderTopColor: "#E8D9C8",
          backgroundColor: "#FFF8F2",
          elevation: 12,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -2 },
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          marginBottom: 2,
        },

        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="subscription"
        options={{
          title: "Premium",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="workspace-premium"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = {
  loaderContainer: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    backgroundColor: "#FFF8F2",
  },
};