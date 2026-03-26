import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Biodata = {
  id: number;
  name: string;
  age: number;
  city: string;
  profession: string;
  image?: string;
  isPremium?: boolean;
  isVerified?: boolean;
};

type Props = {
  data: Biodata;
};

export default function BiodataCard({ data }: Props) {
  const handleView = () => {
    router.push({
      pathname: "/details/[id]",
      params: { id: data.id.toString() },
    });
  };

  // 🔒 Privacy Mask
  const maskedName = data.name ? `${data.name[0]}***` : "User";

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.92}
      onPress={handleView}
    >
      {/* IMAGE SECTION */}
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri:
              data.image ||
              "https://randomuser.me/api/portraits/men/1.jpg",
          }}
          style={styles.image}
        />

        {/* Premium Badge */}
        {data.isPremium && (
          <View style={styles.premiumBadge}>
            <Ionicons name="lock-closed" size={11} color="#fff" />
            <Text style={styles.badgeText}> Premium</Text>
          </View>
        )}

        {/* Verified Badge */}
        {data.isVerified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
          </View>
        )}
      </View>

      {/* INFO SECTION */}
      <View style={styles.info}>
        <Text style={styles.name}>{maskedName}</Text>

        <Text style={styles.meta}>
          {data.age} yrs • {data.city}
        </Text>

        <Text style={styles.profession}>{data.profession}</Text>

        {/* Locked Info */}
        <View style={styles.lockBox}>
          <Ionicons name="lock-closed-outline" size={14} color="#7A1120" />
          <Text style={styles.lockText}>
            Contact & full biodata locked
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.viewBtn} onPress={handleView}>
            <Text style={styles.viewBtnText}>View</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.unlockBtn}>
            <Text style={styles.unlockBtnText}>Unlock</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 10,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: 96,
    height: 110,
    borderRadius: 16,
    backgroundColor: "#f2f2f2",
  },

  premiumBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7A1120",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  verifiedBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 2,
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },

  name: {
    fontSize: 17,
    fontWeight: "800",
    color: "#7A1120",
  },

  meta: {
    color: "#777",
    marginTop: 3,
    fontSize: 13,
  },

  profession: {
    marginTop: 5,
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },

  lockBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E6",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },

  lockText: {
    color: "#7A1120",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
  },

  viewBtn: {
    backgroundColor: "#F5E6D3",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: 10,
  },

  viewBtnText: {
    color: "#7A1120",
    fontSize: 13,
    fontWeight: "700",
  },

  unlockBtn: {
    backgroundColor: "#7A1120",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },

  unlockBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
});