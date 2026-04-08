import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Profile() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const sub = await AsyncStorage.getItem("isSubscribed");
      setIsPremium(sub === "true");
    } catch (error) {
      console.log("Subscription Check Error:", error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/(auth)/login");
  };

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.gradient}
    >
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* TOP SECTION */}
        <View style={styles.topSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("../../assets/resently/resently1.jpg")}
              style={styles.avatar}
            />

            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
            </View>
          </View>

          <Text style={styles.name}>Rahul Patil</Text>
          <Text style={styles.meta}>28 yrs • Pune</Text>

          <View style={styles.statusRow}>
            <View style={styles.statusTag}>
              <Ionicons name="shield-checkmark" size={14} color="#fff" />
              <Text style={styles.statusText}>Verified</Text>
            </View>

            {isPremium && (
              <View style={styles.premiumTag}>
                <Ionicons name="diamond" size={14} color="#fff" />
                <Text style={styles.statusText}>Premium</Text>
              </View>
            )}
          </View>
        </View>

        {/* SUBSCRIPTION CARD */}
        <View style={styles.subscriptionCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.subTitle}>
              {isPremium ? "Premium Active 💎" : "Upgrade to Premium"}
            </Text>

            <Text style={styles.subText}>
              {isPremium
                ? "Valid till: 25 Mar 2027"
                : "Unlock full biodata, contact details and premium profiles"}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.subBtn}
            onPress={() => router.push("/subscription/SubscriptionPage")}
          >
            <Text style={styles.subBtnText}>
              {isPremium ? "Renew" : "Buy ₹100"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* PROFILE INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>My Biodata</Text>

          <InfoRow label="Profession" value="Engineer" />
          <InfoRow label="Education" value="BE Mechanical" />
          <InfoRow label="Religion" value="Jain" />
          <InfoRow label="Height" value={`5'8"`} />
          <InfoRow label="City" value="Pune" />
        </View>

        {/* MENU */}
        <View style={styles.menuCard}>
          <MenuItem
            icon="create-outline"
            text="Edit Biodata"
            onPress={() => router.push("/create-biodata")}
          />

          <MenuItem
            icon="card-outline"
            text="Subscription Plan"
            onPress={() => router.push("/subscription/SubscriptionPage")}
          />

          <MenuItem
            icon="heart-outline"
            text="Saved Profiles"
            onPress={() => Alert.alert("Coming Soon", "Saved Profiles feature will be added soon")}
          />

          <MenuItem
            icon="eye-outline"
            text="Viewed Profiles"
            onPress={() => Alert.alert("Coming Soon", "Viewed Profiles feature will be added soon")}
          />

          <MenuItem
            icon="log-out-outline"
            text="Logout"
            danger
            onPress={() => handleLogout()}
            noBorder
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function MenuItem({
  icon,
  text,
  onPress,
  danger = false,
  noBorder = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  onPress: () => void;
  danger?: boolean;
  noBorder?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.menuItem, noBorder && { borderBottomWidth: 0 }]}
      onPress={() => {
        console.log(`${text} pressed`);
        onPress();
      }}
    >
      <Ionicons
        name={icon}
        size={20}
        color={danger ? "#DC2626" : "#7A1120"}
      />
      <Text style={[styles.menuText, danger && { color: "#DC2626" }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  topSection: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 26,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 118,
    height: 118,
    borderRadius: 59,
    borderWidth: 3,
    borderColor: "#E8D9C8",
  },

  verifiedBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "#fff",
    borderRadius: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 14,
    color: "#7A1120",
  },

  meta: {
    color: "#777",
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
  },

  statusRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  statusTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22C55E",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  premiumTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6D28D9",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 6,
  },

  subscriptionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E6",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F4D7B5",
  },

  subTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#7A1120",
  },

  subText: {
    fontSize: 13,
    color: "#555",
    marginTop: 5,
    lineHeight: 20,
  },

  subBtn: {
    backgroundColor: "#7A1120",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginLeft: 12,
  },

  subBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#7A1120",
    marginBottom: 14,
  },

  row: {
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    color: "#888",
  },

  value: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginTop: 3,
  },

  menuCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 18,
    paddingVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },

  menuText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
});