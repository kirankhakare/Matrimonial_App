import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type RecentBiodataSliderProps = {
  data: {
    id: number;
    name: string;
    age: number;
    city: string;
    photo: string;
    isPremium?: boolean;
    isVerified?: boolean;
  }[];
};

export default function RecentBiodataSlider({
  data,
}: RecentBiodataSliderProps) {
  return (
    <View style={styles.container}>

      {/* Section Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Recently Added ✨</Text>

        <TouchableOpacity onPress={() => router.push("/biodata/all")}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 10 }}
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => router.push(`/details/${item.id}`)}
          >

            {/* Image Wrapper */}
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.photo }}
                style={styles.image}
              />

              {/* Top Badges */}
              <View style={styles.badgeRow}>
                <View style={styles.newBadge}>
                  <Text style={styles.badgeText}>New</Text>
                </View>

                {item.isPremium && (
                  <View style={styles.premiumBadge}>
                    <Ionicons name="lock-closed" size={10} color="#fff" />
                    <Text style={styles.badgeText}> Premium</Text>
                  </View>
                )}
              </View>

              {/* Verified Badge */}
              {item.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                </View>
              )}
            </View>

            {/* Info */}
            <View style={styles.infoBox}>
              <Text style={styles.name}>
                {item.name[0]}***
              </Text>

              <Text style={styles.info}>
                {item.age} yrs
              </Text>

              <Text style={styles.city}>
                📍 {item.city}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    marginBottom: 10,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  viewAll: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF6B00",
  },

  card: {
    width: 145,
    marginRight: 14,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 130,
  },

  badgeRow: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  newBadge: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },

  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B00",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
  },

  verifiedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 3,
  },

  infoBox: {
    padding: 10,
  },

  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
  },

  info: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  city: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },
});