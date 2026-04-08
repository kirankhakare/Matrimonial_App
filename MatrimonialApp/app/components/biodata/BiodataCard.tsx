import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type BiodataType = {
  _id?: string;
  id?: number;
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

    // format: YYYY-MM-DD
    if (dob.includes("-") && dob.split("-")[0].length === 4) {
      birthDate = new Date(dob);
    }
    // format: DD/MM/YYYY
    else if (dob.includes("/")) {
      const [day, month, year] = dob.split("/");
      birthDate = new Date(Number(year), Number(month) - 1, Number(day));
    }
    // format: DD-MM-YYYY
    else if (dob.includes("-")) {
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
  } catch (error) {
    return null;
  }
};

  const displayAge = data.age || getAge(data.dob);

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onView}>
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

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{data.name}</Text>

          <View style={styles.badges}>
            {data.isVerified && (
              <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
            )}
            {data.isPremium && (
              <Ionicons name="diamond" size={16} color="#7A1120" />
            )}
          </View>
        </View>

        <Text style={styles.meta}>
          {displayAge ? `${displayAge} yrs` : "Age N/A"} • {displayCity}
        </Text>

        <Text style={styles.detail}>• {displayJob}</Text>
        <Text style={styles.detail}>• {data.height || "-"}</Text>
        <Text style={styles.detail}>• {displayCaste}</Text>

        <TouchableOpacity style={styles.button} onPress={onView}>
          <Text style={styles.buttonText}>
            {isSubscribed ? "View Full Profile" : "View Profile"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 14,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  image: {
    width: 120,
    height: 160,
  },

  info: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badges: {
    flexDirection: "row",
    gap: 6,
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
    color: "#7A1120",
    flex: 1,
    paddingRight: 8,
  },

  meta: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
    marginBottom: 10,
  },

  detail: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
    fontWeight: "500",
  },

  button: {
    marginTop: 12,
    backgroundColor: "#7A1120",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});