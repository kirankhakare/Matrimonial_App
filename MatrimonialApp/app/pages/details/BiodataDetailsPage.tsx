import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";

import { getBiodataById } from "../../../services/biodataService";

export default function BiodataDetailsPage() {
  const { id } = useLocalSearchParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscription();
    if (id) fetchDetails();
  }, [id]);

  const checkSubscription = async () => {
    const sub = await AsyncStorage.getItem("isSubscribed");
    setIsSubscribed(sub === "true");
  };

  const fetchDetails = async () => {
    try {
      const res = await getBiodataById(id as string);
      setData(res.data);
    } catch (error) {
      console.log("Details Fetch Error:", error);
      Alert.alert("Error", "Failed to load biodata details");
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = () => {
    router.push("/subscription/SubscriptionPage");
  };

  const getAge = (dob?: string) => {
    if (!dob) return null;

    try {
      let birthDate: Date;

      if (dob.includes("-") && dob.split("-")[0].length === 4) {
        birthDate = new Date(dob);
      } else if (dob.includes("/")) {
        const [day, month, year] = dob.split("/");
        birthDate = new Date(Number(year), Number(month) - 1, Number(day));
      } else if (dob.includes("-")) {
        const [day, month, year] = dob.split("-");
        birthDate = new Date(Number(year), Number(month) - 1, Number(day));
      } else {
        return null;
      }

      if (isNaN(birthDate.getTime())) return null;

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    } catch {
      return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7A1120" />
        <Text style={styles.loadingText}>Loading biodata...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loader}>
        <Text style={styles.notFoundText}>Biodata not found</Text>
      </View>
    );
  }

  const age = getAge(data.dob);

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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO IMAGE */}
        <View style={styles.heroWrapper}>
          <Image
            source={
              data.image
                ? { uri: data.image }
                : require("../../../assets/resently/resently1.jpg")
            }
            style={styles.heroImage}
          />

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.heroOverlay} />

          <View style={styles.heroInfo}>
            <View style={styles.badgeRow}>
              {data.isPremium && (
                <View style={styles.premiumBadge}>
                  <Ionicons name="diamond" size={12} color="#fff" />
                  <Text style={styles.badgeText}> Premium</Text>
                </View>
              )}

              {data.isVerified && (
                <View style={styles.verifiedBadge}>
                  <MaterialIcons name="verified" size={14} color="#fff" />
                  <Text style={styles.badgeText}> Verified</Text>
                </View>
              )}
            </View>

            <Text style={styles.name}>
              {data.name}
              {age ? `, ${age}` : ""}
            </Text>

            <Text style={styles.meta}>
              {data.height || "-"} • {data.caste || "-"} • {data.job || "-"}
            </Text>

            <Text style={styles.city}>
              {data.placeOfBirth || "Location not available"}
            </Text>
          </View>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="heart-outline" size={18} color="#7A1120" />
            <Text style={styles.actionText}> Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="share-social-outline" size={18} color="#7A1120" />
            <Text style={styles.actionText}> Share</Text>
          </TouchableOpacity>
        </View>

        {/* ABOUT */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About Profile</Text>
          <Text style={styles.paragraph}>
            {data.name} is a family-oriented and career-focused individual
            looking for a compatible life partner.
          </Text>
        </View>

        {/* BASIC INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <InfoRow icon="briefcase" label="Profession" value={data.job || "-"} />
          <InfoRow icon="school" label="Education" value={data.education || "-"} />
          <InfoRow icon="diamond" label="Caste" value={data.caste || "-"} />
          <InfoRow icon="resize" label="Height" value={data.height || "-"} />
          <InfoRow icon="location" label="City" value={data.placeOfBirth || "-"} />
          <InfoRow icon="calendar" label="Age" value={age ? `${age} Years` : "-"} />
          <InfoRow icon="water" label="Blood Group" value={data.bloodGroup || "-"} />
          <InfoRow icon="language" label="Language" value={data.language || "-"} />
          <InfoRow icon="star" label="Rashi" value={data.ras || "-"} />
          <InfoRow icon="time" label="Birth Time" value={data.birthTime || "-"} />
        </View>

        {/* LOCKED OR UNLOCKED */}
        {!isSubscribed ? (
          <>
            <View style={styles.lockCard}>
              <View style={styles.lockOverlay}>
                <Ionicons name="lock-closed" size={40} color="#7A1120" />
                <Text style={styles.lockOverlayTitle}>Premium Content Locked</Text>
                <Text style={styles.lockOverlaySub}>
                  Upgrade to view full biodata details
                </Text>
              </View>

              <Text style={styles.sectionTitle}>Premium Locked Details</Text>

              <LockRow text="Contact Number Locked" />
              <LockRow text="Email ID Locked" />
              <LockRow text="Family Details Locked" />
              <LockRow text="Salary / Income Locked" />
              <LockRow text="Address Locked" />
            </View>

            <View style={styles.subscriptionCard}>
              <View style={styles.subHeader}>
                <MaterialIcons
                  name="workspace-premium"
                  size={22}
                  color="#B08B3E"
                />
                <Text style={styles.subTitle}> Unlock Full Biodata</Text>
              </View>

              <Text style={styles.subText}>
                View contact details, family info, salary, and complete biodata
                by upgrading your plan.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.unlockButton}
              onPress={handleUnlock}
              activeOpacity={0.9}
            >
              <Ionicons name="lock-open-outline" size={18} color="#fff" />
              <Text style={styles.unlockText}> Unlock Full Biodata</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Unlocked Details</Text>

            <InfoRow icon="call" label="Contact Number" value={data.phone || "-"} />
            <InfoRow icon="mail" label="Email ID" value={data.email || "-"} />
            <InfoRow icon="cash" label="Salary" value={data.salary || "-"} />
            <InfoRow icon="person" label="Father Name" value={data.fatherName || "-"} />
            <InfoRow
              icon="cash-outline"
              label="Father Income"
              value={data.fatherIncome || "-"}
            />
            <InfoRow icon="woman" label="Mother Name" value={data.motherName || "-"} />
            <InfoRow icon="people" label="Siblings" value={data.siblings || "-"} />
            <InfoRow icon="home" label="Address" value={data.address || "-"} />
            <InfoRow
              icon="person-circle"
              label="Contact Person"
              value={data.contactName || "-"}
            />
            <InfoRow icon="heart" label="Hobby" value={data.hobby || "-"} />
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={18} color="#7A1120" style={{ width: 24 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function LockRow({ text }: { text: string }) {
  return (
    <View style={styles.lockRow}>
      <Ionicons name="lock-closed" size={18} color="#7A1120" />
      <Text style={styles.lockText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  loader: {
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

  notFoundText: {
    color: "#7A1120",
    fontWeight: "700",
    fontSize: 16,
  },

  heroWrapper: {
    height: 430,
    position: "relative",
  },

  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  heroOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "48%",
    backgroundColor: "rgba(0,0,0,0.58)",
  },

  backBtn: {
    position: "absolute",
    top: 52,
    left: 18,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },

  heroInfo: {
    position: "absolute",
    bottom: 22,
    left: 20,
    right: 20,
  },

  badgeRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 10,
  },

  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7A1120",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },

  name: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
  },

  meta: {
    fontSize: 15,
    color: "#F1F1F1",
    marginTop: 6,
    fontWeight: "600",
  },

  city: {
    fontSize: 17,
    color: "#fff",
    marginTop: 6,
    fontWeight: "700",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 6,
    gap: 12,
  },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#E7D6C4",
    elevation: 2,
  },

  actionText: {
    color: "#7A1120",
    fontSize: 14,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#7A1120",
    marginBottom: 14,
  },

  paragraph: {
    fontSize: 14,
    color: "#444",
    lineHeight: 24,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  infoLabel: {
    fontSize: 12,
    color: "#888",
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginTop: 3,
    maxWidth: 260,
  },

  lockCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderRadius: 20,
    elevation: 3,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  lockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.90)",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 20,
  },

  lockOverlayTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "800",
    color: "#7A1120",
  },

  lockOverlaySub: {
    marginTop: 6,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },

  lockRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
  },

  lockText: {
    marginLeft: 10,
    color: "#7A1120",
    fontWeight: "600",
    fontSize: 14,
  },

  subscriptionCard: {
    backgroundColor: "#FFF3E6",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F4D7B5",
  },

  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  subTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#7A1120",
  },

  subText: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
    lineHeight: 22,
  },

  unlockButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7A1120",
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 4,
  },

  unlockText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 6,
  },
});