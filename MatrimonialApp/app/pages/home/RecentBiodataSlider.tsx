import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

type BiodataItem = {
  id: number;
  name: string;
  age: number;
  city: string;
  image: any;
  height: string;
  subcast: string;
  profession: string;
  isPremium?: boolean;
  isVerified?: boolean;
};

type Props = {
  data: BiodataItem[];
  isSubscribed?: boolean;
};

const formatName = (fullName: string) => {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[1].charAt(0)}.`;
};

export default function RecentBiodataSlider({
  data,
  isSubscribed = false,
}: Props) {
  const handleCardPress = (id: number) => {
    if (!isSubscribed) {
      router.push("/subscription");
    } else {
      router.push(`/details/${id}`);
    }
  };

  const handleViewAll = () => {
    if (!isSubscribed) {
      router.push("/subscription");
    } else {
      router.push("/biodata/all");
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Recently Added</Text>

        <TouchableOpacity onPress={handleViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.92}
            style={styles.card}
            onPress={() => handleCardPress(item.id)}
          >
            <Image source={item.image} style={styles.image} />

            {/* Premium Badge */}
            {item.isPremium && (
              <View style={styles.premiumBadge}>
                <Ionicons name="diamond" size={12} color="#fff" />
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            )}

            {/* Dark Overlay */}
            <View style={styles.overlay} />

            {/* Bottom Details */}
            <View style={styles.infoContainer}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>
                  {formatName(item.name)}, {item.age}
                </Text>

                {item.isVerified && (
                  <MaterialIcons
                    name="verified"
                    size={18}
                    color="#3B82F6"
                    style={{ marginLeft: 6 }}
                  />
                )}
              </View>

              <Text style={styles.detailsText}>
                {item.height} • {item.subcast} • {item.profession}
              </Text>

              <Text style={styles.cityText}>{item.city}</Text>

              {/* Bottom Tags */}
              <View style={styles.tagRow}>
                <View style={styles.tag}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.tagText}>Online</Text>
                </View>

                <View style={styles.tag}>
                  <Ionicons name="sparkles" size={12} color="#F5B301" />
                  <Text style={styles.tagText}>Astro</Text>
                </View>

                {!isSubscribed && (
                  <View style={styles.lockTag}>
                    <Ionicons name="lock-closed" size={12} color="#fff" />
                    <Text style={styles.lockTagText}>Locked</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    paddingHorizontal: 2,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  viewAll: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B8860B",
  },

  scrollContent: {
    paddingRight: 12,
  },

  card: {
    width: width * 0.78,
    height: 380,
    borderRadius: 28,
    overflow: "hidden",
    marginRight: 16,
    backgroundColor: "#eee",
    elevation: 7,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "45%",
    backgroundColor: "rgba(0,0,0,0.52)",
  },

  premiumBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 5,
    backgroundColor: "#6D28D9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  premiumText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },

  infoContainer: {
    position: "absolute",
    bottom: 18,
    left: 18,
    right: 18,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    flexWrap: "wrap",
  },

  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },

  detailsText: {
    color: "#F3F3F3",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },

  cityText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
  },

  lockTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(122,17,32,0.85)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
  },

  lockTagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },

  tagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00D26A",
  },
});