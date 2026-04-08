import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function SubscriptionPage() {
  const handleSubscribe = async () => {
    await AsyncStorage.setItem("isSubscribed", "true");
    router.replace("/(tabs)");
  };

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.gradient}
    >
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* TOP BAR */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#7A1120" />
        </TouchableOpacity>

        {/* PREMIUM ICON */}
        <View style={styles.iconCircle}>
          <Ionicons name="diamond" size={34} color="#fff" />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>Unlock Full Profiles</Text>
        <Text style={styles.subtitle}>
          Subscription घ्या आणि full biodata, contact details आणि premium profiles unlock करा.
        </Text>

        {/* PLAN CARD */}
        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>Gold Membership</Text>
            <View style={styles.bestTag}>
              <Text style={styles.bestTagText}>Best Value</Text>
            </View>
          </View>

          <Text style={styles.price}>₹100</Text>
          <Text style={styles.duration}>1 Year Access</Text>

          <View style={styles.divider} />

          <Benefit icon="call" text="View Contact Number" />
          <Benefit icon="mail" text="Unlock Email ID" />
          <Benefit icon="people" text="See Family Details" />
          <Benefit icon="document-text" text="Access Full Biodata" />
          <Benefit icon="star" text="View Premium Profiles" />
          <Benefit icon="heart" text="Unlimited Profile Access" />
        </View>

        {/* SUBSCRIBE BUTTON */}
        <TouchableOpacity style={styles.btn} onPress={handleSubscribe}>
          <Text style={styles.btnText}>Subscribe Now</Text>
        </TouchableOpacity>

        {/* SECONDARY CTA */}
        <TouchableOpacity style={styles.laterBtn} onPress={() => router.back()}>
          <Text style={styles.laterText}>Maybe Later</Text>
        </TouchableOpacity>

        {/* NOTE */}
        <Text style={styles.note}>
          Secure access • One-time membership • Premium matrimony experience
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

function Benefit({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View style={styles.benefitRow}>
      <View style={styles.checkIconWrap}>
        <Ionicons name={icon} size={16} color="#7A1120" />
      </View>
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    paddingTop: 56,
    paddingHorizontal: 22,
    paddingBottom: 40,
    alignItems: "center",
  },

  backBtn: {
    alignSelf: "flex-start",
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 24,
  },

  iconCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#7A1120",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#7A1120",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#7A1120",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 26,
    paddingHorizontal: 10,
  },

  planCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#F0D8C2",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 28,
  },

  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  planTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1D1D1D",
  },

  bestTag: {
    backgroundColor: "#FDE68A",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  bestTagText: {
    color: "#7A1120",
    fontWeight: "800",
    fontSize: 12,
  },

  price: {
    fontSize: 42,
    fontWeight: "900",
    color: "#7A1120",
    marginTop: 16,
  },

  duration: {
    fontSize: 15,
    color: "#777",
    marginTop: 4,
    marginBottom: 18,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#F0E2D6",
    marginBottom: 18,
  },

  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  checkIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFF3E6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  benefitText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
  },

  btn: {
    backgroundColor: "#7A1120",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: "center",
    shadowColor: "#7A1120",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  btnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 17,
  },

  laterBtn: {
    marginTop: 16,
  },

  laterText: {
    color: "#7A1120",
    fontWeight: "700",
    fontSize: 14,
  },

  note: {
    marginTop: 24,
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
});