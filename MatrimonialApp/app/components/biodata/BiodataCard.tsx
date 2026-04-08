import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

type BiodataType = {
  _id?: string;
  id?: number | string;
  name: string;
  age?: number;
  dob?: string;
  city?: string;
  placeOfBirth?: string;
  profession?: string;
  job?: string;
  image?: string | any;
  height?: string;
  caste?: string;
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
  const displayCity = data.city || data.placeOfBirth || "-";
  const displayJob = data.profession || data.job || "-";
  const displayCaste = data.subcast || data.caste || "-";

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

  const displayAge = data.age || getAge(data.dob);

  return (
    <TouchableOpacity activeOpacity={0.92} style={styles.card} onPress={onView}>
      {/* LEFT IMAGE */}
      <View style={styles.imageWrapper}>
        <Image
          source={
            typeof data.image === "string" && data.image
              ? { uri: data.image }
              : data.image
              ? data.image
              : require("../../../assets/resently/resently1.jpg")
          }
          style={styles.image}
        />

        {/* Premium Badge */}
        <View style={styles.overlayTop}>
          {data.isPremium && (
            <View style={styles.premiumBadge}>
              <MaterialIcons name="workspace-premium" size={14} color="#fff" />
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}
        </View>

        {/* Verified Badge */}
        {data.isVerified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
          </View>
        )}
      </View>

      {/* RIGHT CONTENT */}
      <View style={styles.info}>
        <View>
          <Text numberOfLines={1} style={styles.name}>
            {data.name}
          </Text>

          <Text style={styles.meta}>
            {displayAge ? `${displayAge} yrs` : "Age N/A"} • {displayCity}
          </Text>

          <View style={styles.chipsWrap}>
            <View style={styles.chip}>
              <Ionicons name="briefcase-outline" size={13} color="#7A1120" />
              <Text style={styles.chipText} numberOfLines={1}>
                {displayJob}
              </Text>
            </View>

            <View style={styles.chip}>
              <Ionicons name="resize-outline" size={13} color="#7A1120" />
              <Text style={styles.chipText}>{data.height || "-"}</Text>
            </View>
          </View>

          <View style={styles.casteRow}>
            <Ionicons name="people-outline" size={14} color="#7A1120" />
            <Text style={styles.casteText} numberOfLines={1}>
              {displayCaste}
            </Text>
          </View>

          {!isSubscribed && (
            <View style={styles.lockNotice}>
              <Ionicons name="lock-closed" size={13} color="#B08B3E" />
              <Text style={styles.lockNoticeText}>
                Full biodata locked for free users
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={onView} activeOpacity={0.88}>
          <Text style={styles.buttonText}>
            {isSubscribed ? "View Full Profile" : "Unlock Profile"}
          </Text>
          <Ionicons
            name={isSubscribed ? "arrow-forward" : "lock-open-outline"}
            size={16}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F2E6DA",
  },

  imageWrapper: {
    width: 128,
    height: 185,
    position: "relative",
    backgroundColor: "#F7F1EB",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlayTop: {
    position: "absolute",
    top: 10,
    left: 10,
  },

  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(122,17,32,0.92)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },

  premiumText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    marginLeft: 4,
  },

  verifiedBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 2,
  },

  info: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },

  name: {
    fontSize: 19,
    fontWeight: "900",
    color: "#7A1120",
    marginBottom: 4,
  },

  meta: {
    fontSize: 13,
    color: "#7D7D7D",
    marginBottom: 12,
    fontWeight: "500",
  },

  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF4EC",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 18,
    maxWidth: "100%",
  },

  chipText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#7A1120",
    fontWeight: "700",
    maxWidth: 110,
  },

  casteRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  casteText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#444",
    fontWeight: "600",
    flex: 1,
  },

  lockNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8ED",
    borderWidth: 1,
    borderColor: "#F4D7B5",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
    marginTop: 2,
  },

  lockNoticeText: {
    marginLeft: 6,
    color: "#9A6A16",
    fontSize: 11.5,
    fontWeight: "700",
    flex: 1,
  },

  button: {
    marginTop: 14,
    backgroundColor: "#7A1120",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
    marginRight: 6,
  },
});