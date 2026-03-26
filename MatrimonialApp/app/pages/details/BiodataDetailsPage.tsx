import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/header/Header";
import { Ionicons } from "@expo/vector-icons";

export default function BiodataDetailsPage() {

  const isPremiumLocked = true; // 🔹 later backend check

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.gradient}
    >
      {/* HEADER */}
      <Header title="Biodata Details" showBack showProfile={false} />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* PROFILE TOP */}
        <View style={styles.profileContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              style={styles.profileImage}
            />

            {/* Verified */}
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
            </View>

            {/* Premium */}
            <View style={styles.premiumBadge}>
              <Ionicons name="lock-closed" size={12} color="#fff" />
              <Text style={styles.badgeText}> Premium</Text>
            </View>
          </View>

          <Text style={styles.name}>R***l P***l</Text>
          <Text style={styles.meta}>28 yrs • Pune</Text>

          {/* Top Buttons */}
          <View style={styles.topButtonRow}>
            <TouchableOpacity style={styles.shareBtn}>
              <Ionicons name="share-social-outline" size={16} color="#7A1120" />
              <Text style={styles.shareText}> Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn}>
              <Ionicons name="heart-outline" size={16} color="#7A1120" />
              <Text style={styles.shareText}> Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BASIC INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Profession</Text>
            <Text style={styles.value}>Engineer</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Education</Text>
            <Text style={styles.value}>BE Mechanical</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Religion</Text>
            <Text style={styles.value}>Jain</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Height</Text>
            <Text style={styles.value}>5'8"</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>Pune</Text>
          </View>
        </View>

        {/* LOCKED PREMIUM INFO */}
        <View style={styles.lockCard}>
          <Text style={styles.sectionTitle}>Premium Locked Details 🔒</Text>

          <View style={styles.lockRow}>
            <Ionicons name="lock-closed" size={18} color="#7A1120" />
            <Text style={styles.lockText}>Contact Number Locked</Text>
          </View>

          <View style={styles.lockRow}>
            <Ionicons name="lock-closed" size={18} color="#7A1120" />
            <Text style={styles.lockText}>Email ID Locked</Text>
          </View>

          <View style={styles.lockRow}>
            <Ionicons name="lock-closed" size={18} color="#7A1120" />
            <Text style={styles.lockText}>Family Details Locked</Text>
          </View>

          <View style={styles.lockRow}>
            <Ionicons name="lock-closed" size={18} color="#7A1120" />
            <Text style={styles.lockText}>Annual Income Locked</Text>
          </View>

          <View style={styles.lockRow}>
            <Ionicons name="lock-closed" size={18} color="#7A1120" />
            <Text style={styles.lockText}>Partner Preference Full Details Locked</Text>
          </View>
        </View>

        {/* SUBSCRIPTION BANNER */}
        {isPremiumLocked && (
          <View style={styles.subscriptionCard}>
            <Text style={styles.subTitle}>Unlock Full Biodata 🔓</Text>
            <Text style={styles.subText}>
              ₹100 मध्ये 1 वर्षासाठी contact details, family info आणि premium biodata access मिळवा
            </Text>
          </View>
        )}

        {/* UNLOCK BUTTON */}
        <TouchableOpacity style={styles.unlockButton}>
          <Text style={styles.unlockText}>Unlock Full Biodata</Text>
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  imageWrapper: {
    position: "relative",
  },

  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: "#E8D9C8",
  },

  verifiedBadge: {
    position: "absolute",
    bottom: 8,
    right: 6,
    backgroundColor: "#fff",
    borderRadius: 20,
  },

  premiumBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7A1120",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  name: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 12,
    color: "#7A1120",
  },

  meta: {
    color: "#777",
    marginTop: 4,
    fontSize: 14,
  },

  topButtonRow: {
    flexDirection: "row",
    marginTop: 14,
  },

  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5E6D3",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: 10,
  },

  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5E6D3",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },

  shareText: {
    color: "#7A1120",
    fontSize: 13,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#7A1120",
    marginBottom: 10,
  },

  row: {
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: "#888",
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginTop: 2,
  },

  lockCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
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
    padding: 16,
    borderRadius: 16,
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

  unlockButton: {
    backgroundColor: "#7A1120",
    margin: 20,
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