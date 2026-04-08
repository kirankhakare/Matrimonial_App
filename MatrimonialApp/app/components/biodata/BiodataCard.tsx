import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

type BiodataType = {
  id: number;
  name: string;
  age: number;
  city: string;
  profession: string;
  image?: any;
  height?: string;
  subcast?: string;
  isPremium?: boolean;
  isVerified?: boolean;
};

type Props = {
  data: BiodataType;
  isSubscribed?: boolean;
  onView?: () => void;
};

export default function BiodataCard({
  data,
  isSubscribed = false,
  onView,
}: Props) {
  return (
    <View style={styles.card}>
      {/* LEFT SIDE IMAGE */}
      <Image
        source={data.image || require("../../../assets/resently/resently1.jpg")}
        style={styles.image}
      />

      {/* RIGHT SIDE INFO */}
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>
            {data.name}, {data.age}
          </Text>

          {data.isVerified && (
            <Ionicons name="checkmark-circle" size={18} color="#1D9BF0" />
          )}
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="straighten" size={15} color="#A48C6A" />
          <Text style={styles.infoText}>Height: {data.height || "N/A"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="sparkles" size={14} color="#A48C6A" />
          <Text style={styles.infoText}>Subcast: {data.subcast || "N/A"}</Text>
        </View>

        <View style={styles.infoRow}>
          <FontAwesome5 name="briefcase" size={13} color="#A48C6A" />
          <Text style={styles.infoText}>Profession: {data.profession}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-sharp" size={15} color="#D94A6A" />
          <Text style={styles.infoText}>Location: {data.city}</Text>
        </View>

        {!isSubscribed && (
          <Text style={styles.lockText}>
            🔒 Full details after subscription
          </Text>
        )}

        {/* BUTTONS */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.viewBtn} onPress={onView}>
            <Text style={styles.viewBtnText}>View More</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn}>
            <Ionicons name="heart-outline" size={17} color="#7A1120" />
            <Text style={styles.saveText}> Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },

  image: {
    width: 125,
    height: "100%",
    minHeight: 220,
    resizeMode: "cover",
  },

  infoContainer: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 6,
    flexWrap: "wrap",
  },

  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1D1D1D",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  infoText: {
    fontSize: 14,
    color: "#4B4B4B",
    marginLeft: 8,
    fontWeight: "500",
    flexShrink: 1,
  },

  lockText: {
    marginTop: 8,
    color: "#B8860B",
    fontSize: 12,
    fontWeight: "700",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 14,
    alignItems: "center",
  },

  viewBtn: {
    backgroundColor: "#7A1120",
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 24,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },

  viewBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  saveBtn: {
    borderWidth: 1.2,
    borderColor: "#D5B9B9",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  saveText: {
    color: "#7A1120",
    fontWeight: "600",
    fontSize: 13,
  },
});