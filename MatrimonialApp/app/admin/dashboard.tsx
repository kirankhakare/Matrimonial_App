import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Header from "../components/header/Header";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/adminService";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalBiodata: 0,
    totalUsers: 0,
    premiumUsers: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

 const fetchDashboardStats = async () => {
  try {
    setLoading(true);

    const token = await AsyncStorage.getItem("token");

    const res = await getDashboardStats(token);

    setStats({
      totalBiodata: res?.data?.stats?.totalBiodata || 0,
      totalUsers: res?.data?.stats?.totalUsers || 0,
      premiumUsers: res?.data?.stats?.premiumUsers || 0,
    });
  } catch (error) {
    console.log("Admin Dashboard Error:", error);
    Alert.alert("Error", "Failed to load dashboard stats");
  } finally {
    setLoading(false);
  }
};

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/(auth)/login");
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#7A1120" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Admin Panel" showBack={false} showProfile={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TOP */}
        <View style={styles.topSection}>
          <Text style={styles.title}>Welcome Admin 👑</Text>
          <Text style={styles.subtitle}>
            Control your matrimonial platform professionally
          </Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="document-text-outline" size={24} color="#7A1120" />
            <Text style={styles.statNumber}>{stats.totalBiodata}</Text>
            <Text style={styles.statLabel}>Biodata</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="people-outline" size={24} color="#7A1120" />
            <Text style={styles.statNumber}>{stats.totalUsers}</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialIcons
              name="workspace-premium"
              size={24}
              color="#B08B3E"
            />
            <Text style={styles.statNumber}>{stats.premiumUsers}</Text>
            <Text style={styles.statLabel}>Premium</Text>
          </View>
        </View>

        {/* MODULES */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>Admin Controls</Text>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/admin/manage-biodata" as any)}
          >
            <Ionicons name="document-text-outline" size={22} color="#7A1120" />
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Manage Biodata</Text>
              <Text style={styles.cardSub}>
                View, monitor and delete user biodata
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/admin/manage-users" as any)}
          >
            <Ionicons name="people-outline" size={22} color="#7A1120" />
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Manage Users</Text>
              <Text style={styles.cardSub}>
                View all registered users and premium status
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/admin/manage-subscriptions" as any)}
          >
            <MaterialIcons
              name="workspace-premium"
              size={22}
              color="#B08B3E"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Manage Subscriptions</Text>
              <Text style={styles.cardSub}>
                Control premium access and plan details
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/admin/payment-reports" as any)}
          >
            <FontAwesome5
              name="file-invoice-dollar"
              size={20}
              color="#7A1120"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Payment Reports</Text>
              <Text style={styles.cardSub}>
                View premium payment activity and records
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* REFRESH */}
        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={fetchDashboardStats}
        >
          <Ionicons name="refresh-outline" size={18} color="#7A1120" />
          <Text style={styles.refreshText}> Refresh Dashboard</Text>
        </TouchableOpacity>

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

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8F2",
  },

  loadingText: {
    marginTop: 10,
    color: "#7A1120",
    fontWeight: "600",
  },

  topSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
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
    marginBottom: 22,
  },

  statCard: {
    backgroundColor: "#fff",
    width: "31%",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8D9C8",
    elevation: 2,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#7A1120",
    marginTop: 8,
  },

  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  sectionWrap: {
    paddingHorizontal: 16,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#7A1120",
    marginBottom: 14,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8D9C8",
    elevation: 2,
  },

  cardContent: {
    flex: 1,
    marginLeft: 12,
  },

  cardText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },

  cardSub: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
    lineHeight: 18,
  },

  refreshBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E8D9C8",
    borderRadius: 28,
    paddingVertical: 14,
  },

  refreshText: {
    color: "#7A1120",
    fontSize: 14,
    fontWeight: "700",
  },

  button: {
    backgroundColor: "#7A1120",
    marginHorizontal: 20,
    marginTop: 16,
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