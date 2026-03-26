import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Header from "../components/header/Header";
import { Ionicons } from "@expo/vector-icons";

export default function AdminDashboard() {

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Header title="Admin Panel" showBack={false} showProfile={false} />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* WELCOME */}
        <View style={styles.topSection}>
          <Text style={styles.title}>Welcome Admin 👑</Text>
          <Text style={styles.subtitle}>
            Manage users, biodata & subscriptions
          </Text>
        </View>

        {/* STATS CARDS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Biodata</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>85</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>40</Text>
            <Text style={styles.statLabel}>Premium</Text>
          </View>
        </View>

        {/* ACTION CARDS */}
        <View style={styles.cardContainer}>

          <TouchableOpacity style={styles.card}>
            <Ionicons name="document-text-outline" size={20} color="#7A1120" />
            <Text style={styles.cardText}>Manage Biodata</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Ionicons name="people-outline" size={20} color="#7A1120" />
            <Text style={styles.cardText}>Manage Users</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Ionicons name="card-outline" size={20} color="#7A1120" />
            <Text style={styles.cardText}>Payment Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Ionicons name="megaphone-outline" size={20} color="#7A1120" />
            <Text style={styles.cardText}>Manage Ads</Text>
          </TouchableOpacity>

        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFF8F2",
  },

  topSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#7A1120",
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  statCard: {
    backgroundColor: "#fff",
    width: "30%",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8D9C8",
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#7A1120",
  },

  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  cardContainer: {
    paddingHorizontal: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8D9C8",
  },

  cardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },

  button: {
    backgroundColor: "#7A1120",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

});