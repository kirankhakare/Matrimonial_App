import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function AdminDashboard() {
  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Welcome Admin 👑</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>📋 Manage All Biodata</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>👥 Manage Users</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>💳 Payment Reports</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F3EA",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#7A0F1E",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B5B4F",
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#FFFDF9",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E7D9C7",
    marginBottom: 14,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3A2A22",
  },
  button: {
    backgroundColor: "#7A0F1E",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#F8F3EA",
    fontSize: 16,
    fontWeight: "700",
  },
});