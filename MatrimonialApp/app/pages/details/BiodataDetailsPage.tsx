import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function BiodataDetailsPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    const sub = await AsyncStorage.getItem("isSubscribed");
    setIsSubscribed(sub === "true");
  };

  const handleUnlock = () => {
    router.push("/subscription");
  };

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.gradient}
    >
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO IMAGE SECTION */}
        <View style={styles.heroWrapper}>
          <Image
            source={require("../../../assets/resently/resently1.jpg")}
            style={styles.heroImage}
          />

          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.heroOverlay} />

          <View style={styles.heroInfo}>
            <View style={styles.badgeRow}>
              <View style={styles.premiumBadge}>
                <Ionicons name="diamond" size={12} color="#fff" />
                <Text style={styles.badgeText}> Premium</Text>
              </View>

              <View style={styles.verifiedBadge}>
                <MaterialIcons name="verified" size={14} color="#fff" />
                <Text style={styles.badgeText}> Verified</Text>
              </View>
            </View>

            <Text style={styles.name}>Rahul Patil, 28</Text>
            <Text style={styles.meta}>5'8" • Jain • Engineer</Text>
            <Text style={styles.city}>Pune, Maharashtra</Text>
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
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.paragraph}>
            I am a simple, family-oriented and career-focused person looking for a
            compatible life partner who values respect, understanding and togetherness.
          </Text>
        </View>

        {/* BASIC INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <InfoRow icon="briefcase" label="Profession" value="Engineer" />
          <InfoRow icon="school" label="Education" value="BE Mechanical" />
          <InfoRow icon="diamond" label="Religion" value="Jain" />
          <InfoRow icon="resize" label="Height" value={`5'8"`} />
          <InfoRow icon="location" label="City" value="Pune" />
          <InfoRow icon="calendar" label="Age" value="28 Years" />
        </View>

        {/* LOCKED OR UNLOCKED SECTION */}
        {!isSubscribed ? (
          <>
            <View style={styles.lockCard}>
              <Text style={styles.sectionTitle}>Premium Locked Details 🔒</Text>

              <LockRow text="Contact Number Locked" />
              <LockRow text="Email ID Locked" />
              <LockRow text="Family Details Locked" />
              <LockRow text="Annual Income Locked" />
              <LockRow text="Partner Preference Full Details Locked" />
            </View>

            <View style={styles.subscriptionCard}>
              <Text style={styles.subTitle}>Unlock Full Biodata 🔓</Text>
              <Text style={styles.subText}>
                ₹100 मध्ये 1 वर्षासाठी contact details, family info आणि premium biodata access मिळवा.
              </Text>
            </View>

            <TouchableOpacity style={styles.unlockButton} onPress={handleUnlock}>
              <Text style={styles.unlockText}>Unlock Full Biodata</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Unlocked Details</Text>

              <InfoRow icon="call" label="Contact Number" value="+91 98XXXXXX12" />
              <InfoRow icon="mail" label="Email ID" value="rahulpatil@gmail.com" />
              <InfoRow icon="cash" label="Annual Income" value="₹8,50,000" />
              <InfoRow icon="home" label="Family Type" value="Joint Family" />
              <InfoRow icon="people" label="Partner Preference" value="Educated, family-oriented, caring partner" />
            </View>
          </>
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
      <View>
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

  heroWrapper: {
    height: 420,
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
    height: "45%",
    backgroundColor: "rgba(0,0,0,0.55)",
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
    backgroundColor: "#6D28D9",
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

  subTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#7A1120",
  },

  subText: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
    lineHeight: 22,
  },

  unlockButton: {
    backgroundColor: "#7A1120",
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  unlockText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});