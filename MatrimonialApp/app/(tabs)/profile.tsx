import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { getMyBiodata } from "../../services/biodataService";

export default function Profile() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBiodata();
  }, []);

  const fetchBiodata = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) return;

      const res = await getMyBiodata(token);
      setData(res.data);
    } catch (error) {
      console.log("Fetch Biodata Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove(["token", "user", "isSubscribed"]);
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7A1120" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loader}>
        <Text>No Biodata Found</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/create-biodata")}
        >
          <Text style={styles.buttonText}>Create Biodata</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.container}
    >
      <ScrollView>

        {/* PROFILE TOP */}
        <View style={styles.top}>
          <Image
            source={
              data.image
                ? { uri: data.image }
                : require("../../assets/resently/resently1.jpg")
            }
            style={styles.avatar}
          />

          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.meta}>
            {data.age} yrs • {data.placeOfBirth}
          </Text>
        </View>

        {/* INFO CARD */}
        <View style={styles.card}>
          <Text style={styles.title}>My Biodata</Text>

          <Info label="Profession" value={data.job} />
          <Info label="Education" value={data.education} />
          <Info label="Caste" value={data.caste} />
          <Info label="Height" value={data.height} />
          <Info label="Language" value={data.language} />
          <Info label="Salary" value={data.salary} />
        </View>

        {/* ACTIONS */}
        <View style={styles.menu}>
          <MenuItem
            icon="create-outline"
            text="Edit Biodata"
            onPress={() => router.push("/create-biodata")}
          />

          <MenuItem
            icon="card-outline"
            text="Subscription"
            onPress={() => router.push("/subscription/SubscriptionPage")}
          />

          <MenuItem
            icon="log-out-outline"
            text="Logout"
            danger
            onPress={handleLogout}
          />
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

function Info({ label, value }: any) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "-"}</Text>
    </View>
  );
}

function MenuItem({ icon, text, onPress, danger }: any) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons
        name={icon}
        size={20}
        color={danger ? "red" : "#7A1120"}
      />
      <Text style={[styles.menuText, danger && { color: "red" }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  top: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  name: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },

  meta: {
    color: "#777",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },

  title: {
    fontWeight: "800",
    marginBottom: 10,
  },

  row: {
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    color: "#888",
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
  },

  menu: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
  },

  menuItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  menuText: {
    marginLeft: 10,
    fontWeight: "600",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#7A1120",
    padding: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
  },
});