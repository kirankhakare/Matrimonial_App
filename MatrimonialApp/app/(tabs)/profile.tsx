import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { getMyBiodata } from "../../services/biodataService";

export default function Profile() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const sub = await AsyncStorage.getItem("isSubscribed");
      setIsSubscribed(sub === "true");

      if (!token) return;

      const res = await getMyBiodata(token);
      setData(res.data);
    } catch (error) {
      console.log("Fetch Biodata Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove(["token", "user", "isSubscribed"]);
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7A1120" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <LinearGradient
        colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
        style={styles.emptyContainer}
      >
        <View style={styles.emptyCard}>
          <Ionicons name="person-circle-outline" size={80} color="#B08B3E" />
          <Text style={styles.emptyTitle}>No Biodata Found</Text>
          <Text style={styles.emptySub}>
            Create your biodata to start receiving matches.
          </Text>

          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => router.push("/create-biodata")}
          >
            <Text style={styles.createBtnText}>Create Biodata</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* TOP HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        {/* PROFILE HERO CARD */}
        <LinearGradient
          colors={["#7A1120", "#A11D33", "#C08A2D"]}
          style={styles.heroCard}
        >
          <View style={styles.avatarWrapper}>
            <Image
              source={
                data.image
                  ? { uri: data.image }
                  : require("../../assets/resently/resently1.jpg")
              }
              style={styles.avatar}
            />

            <View style={styles.badgeWrap}>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
            </View>
          </View>

          <Text style={styles.name}>{data.name || "User Name"}</Text>

          <Text style={styles.meta}>
            {data.age || "-"} yrs • {data.placeOfBirth || "City not added"}
          </Text>

          <View style={styles.topTags}>
            <View style={styles.tag}>
              <Ionicons name="briefcase-outline" size={14} color="#fff" />
              <Text style={styles.tagText}>{data.job || "Profession"}</Text>
            </View>

            <View style={styles.tag}>
              <Ionicons name="school-outline" size={14} color="#fff" />
              <Text style={styles.tagText}>{data.education || "Education"}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* SUBSCRIPTION STATUS */}
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionLeft}>
            <View
              style={[
                styles.subscriptionIcon,
                { backgroundColor: isSubscribed ? "#EAF7EE" : "#FFF3E6" },
              ]}
            >
              <MaterialIcons
                name={isSubscribed ? "workspace-premium" : "lock-outline"}
                size={22}
                color={isSubscribed ? "#2E7D32" : "#B08B3E"}
              />
            </View>

            <View>
              <Text style={styles.subscriptionTitle}>
                {isSubscribed ? "Premium Active" : "Free Plan"}
              </Text>
              <Text style={styles.subscriptionSub}>
                {isSubscribed
                  ? "You can view all biodata details"
                  : "Upgrade to unlock full profile details"}
              </Text>
            </View>
          </View>

          {!isSubscribed && (
            <TouchableOpacity
              style={styles.upgradeBtn}
              onPress={() => router.push("/subscription/SubscriptionPage")}
            >
              <Text style={styles.upgradeBtnText}>Upgrade</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* INFO GRID */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          <View style={styles.infoGrid}>
            <InfoCard icon="briefcase-outline" label="Profession" value={data.job} />
            <InfoCard icon="school-outline" label="Education" value={data.education} />
            <InfoCard icon="people-outline" label="Caste" value={data.caste} />
            <InfoCard icon="resize-outline" label="Height" value={data.height} />
            <InfoCard icon="language-outline" label="Language" value={data.language} />
            <InfoCard icon="cash-outline" label="Salary" value={data.salary} />
          </View>
        </View>

        {/* ACTION MENU */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>

          <View style={styles.menu}>
            <MenuItem
              icon="create-outline"
              text="Edit Biodata"
              onPress={() => router.push("/create-biodata")}
            />

            <MenuItem
              icon="card-outline"
              text="Manage Subscription"
              onPress={() => router.push("/subscription/SubscriptionPage")}
            />

            <MenuItem
              icon="log-out-outline"
              text="Logout"
              danger
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function InfoCard({ icon, label, value }: any) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={18} color="#7A1120" />
      </View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || "-"}</Text>
    </View>
  );
}

function MenuItem({ icon, text, onPress, danger }: any) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.85}>
      <View
        style={[
          styles.menuIconWrap,
          { backgroundColor: danger ? "#FDECEC" : "#FFF4EC" },
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={danger ? "#D32F2F" : "#7A1120"}
        />
      </View>

      <Text style={[styles.menuText, danger && { color: "#D32F2F" }]}>
        {text}
      </Text>

      <Ionicons
        name="chevron-forward"
        size={18}
        color={danger ? "#D32F2F" : "#999"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8F2",
  },

  loadingText: {
    marginTop: 12,
    color: "#7A1120",
    fontWeight: "600",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#7A1120",
    marginTop: 16,
  },

  emptySub: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
  },

  createBtn: {
    marginTop: 20,
    backgroundColor: "#7A1120",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
  },

  createBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },

  header: {
    paddingTop: 58,
    paddingHorizontal: 18,
    marginBottom: 14,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#7A1120",
    textAlign: "center",
  },

  heroCard: {
    marginHorizontal: 16,
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 7,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 14,
  },

  avatar: {
    width: 115,
    height: 115,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
  },

  badgeWrap: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#2E7D32",
    borderRadius: 20,
    padding: 2,
  },

  name: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
  },

  meta: {
    fontSize: 14,
    color: "#F8E7D1",
    marginTop: 6,
    textAlign: "center",
  },

  topTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 18,
  },

  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 22,
  },

  tagText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
    fontSize: 13,
  },

  subscriptionCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  subscriptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  subscriptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  subscriptionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#222",
  },

  subscriptionSub: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  upgradeBtn: {
    backgroundColor: "#7A1120",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginLeft: 12,
  },

  upgradeBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },

  section: {
    marginTop: 22,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#7A1120",
    marginBottom: 14,
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  infoCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFF4EC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  infoLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },

  menu: {
    backgroundColor: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4",
  },

  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  menuText: {
    flex: 1,
    fontWeight: "700",
    fontSize: 15,
    color: "#222",
  },
});