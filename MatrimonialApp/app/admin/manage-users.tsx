import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import Header from "../components/header/Header";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { getAllUsersAdmin, deleteUserAdmin } from "../../services/adminService";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsersAdmin();
      setUsers(res?.data || []);
    } catch (error) {
      console.log("Fetch Users Error:", error);
      Alert.alert("Error", "Failed to load users");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteUserAdmin(id);
            Alert.alert("Deleted", "User deleted successfully");
            fetchUsers();
          } catch (error) {
            console.log("Delete User Error:", error);
            Alert.alert("Error", "Failed to delete user");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{item.name}</Text>

          {item.isSubscribed && (
            <View style={styles.premiumBadge}>
              <MaterialIcons name="workspace-premium" size={14} color="#fff" />
              <Text style={styles.badgeText}> Premium</Text>
            </View>
          )}
        </View>

        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.meta}>Role: {item.role || "user"}</Text>
      </View>

      <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item._id)}>
        <Ionicons name="trash-outline" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Manage Users" showBack={true} showProfile={false} />

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#7A1120" />
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Ionicons name="people-outline" size={50} color="#BCA18A" />
              <Text style={styles.emptyTitle}>No Users Found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F2" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { padding: 16, paddingBottom: 30 },

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

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#7A1120",
  },

  email: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },

  meta: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B08B3E",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  deleteBtn: {
    backgroundColor: "#D11A2A",
    padding: 12,
    borderRadius: 12,
    marginLeft: 12,
  },

  emptyWrap: {
    alignItems: "center",
    marginTop: 100,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#7A1120",
    marginTop: 12,
  },
});