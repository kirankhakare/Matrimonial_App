import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  showProfile?: boolean;
};

export default function Header({
  title,
  showBack = false,
  showProfile = true,
}: HeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        {/* LEFT */}
        <View style={styles.leftSection}>
          {showBack ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#7A1120" />
            </TouchableOpacity>
          ) : (
            <Image
              source={require("../../../assets/images/icon.png")}
              style={styles.logo}
            />
          )}
        </View>

        {/* CENTER */}
        <View style={styles.centerSection}>
          <Text style={styles.mainTitle}>
            {title ? title : "भाग्यबंधन"}
          </Text>

          {!title && (
            <Text style={styles.subTitle}>
              नशिबाने जुळलेली जोडी
            </Text>
          )}
        </View>

        {/* RIGHT */}
        <View style={styles.rightSection}>
          {showProfile ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/profile")}
            >
              <Ionicons name="person-outline" size={22} color="#7A1120" />
            </TouchableOpacity>
          ) : (
            <View style={styles.sideSpace} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFF8F2",
    paddingTop: 48,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E8D9C8",
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  leftSection: {
    width: 52,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  centerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  rightSection: {
    width: 52,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  logo: {
    width: 46,
    height: 46,
    borderRadius: 12,
    resizeMode: "contain",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E8D9C8",
  },

  mainTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#7A1120",
    letterSpacing: 0.4,
  },

  subTitle: {
    fontSize: 11,
    color: "#B08B3E",
    marginTop: 2,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  iconButton: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8D9C8",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  sideSpace: {
    width: 38,
    height: 38,
  },
});