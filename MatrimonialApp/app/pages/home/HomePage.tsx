import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import BiodataCard from "../../components/biodata/BiodataCard";
import { getAllBiodata } from "../../../services/biodataService";

export default function HomePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    fetchData();
    checkSubscription();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllBiodata();
      setData(res.data || []);
    } catch (error) {
      console.log("Home Biodata Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkSubscription = async () => {
    const sub = await AsyncStorage.getItem("isSubscribed");
    setIsSubscribed(sub === "true");
  };

  const handleViewProfile = (item: any) => {
    if (!isSubscribed) {
      router.push("/subscription/SubscriptionPage");
      return;
    }

    router.push(`/details/${item._id}`);
  };

  const featured = data.slice(0, 5);

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

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7A1120" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.container}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 18 }}
        ListHeaderComponent={
          <>
            {/* FEATURED SECTION */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recently Added Profiles</Text>

              <FlatList
                horizontal
                data={featured}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.featuredCard}
                    activeOpacity={0.9}
                    onPress={() => handleViewProfile(item)}
                  >
                    <Image
                      source={
                        item.image
                          ? { uri: item.image }
                          : require("../../../assets/resently/resently1.jpg")
                      }
                      style={styles.featuredImage}
                    />
                    <View style={styles.overlay}>
                      <Text style={styles.featuredName}>{item.name}</Text>
                      <Text style={styles.featuredMeta}>
                        {getAge(item.dob) || "Age N/A"} • {item.placeOfBirth || "-"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>

            {/* ALL PROFILES TITLE */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>All Profiles</Text>
              <TouchableOpacity onPress={() => router.push("/biodata/all")}>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <BiodataCard
            data={item}
            isSubscribed={isSubscribed}
            onView={() => handleViewProfile(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No biodata found yet</Text>
          </View>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8F2",
  },

  section: {
    marginTop: 6,
    marginBottom: 10,
  },

  sectionHeader: {
    marginTop: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#7A1120",
  },

  viewAll: {
    color: "#7A1120",
    fontWeight: "700",
    fontSize: 15,
  },

  featuredCard: {
    width: 220,
    height: 280,
    marginRight: 14,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#eee",
  },

  featuredImage: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 14,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  featuredName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  featuredMeta: {
    color: "#fff",
    fontSize: 13,
    marginTop: 4,
  },

  empty: {
    alignItems: "center",
    marginTop: 50,
  },

  emptyText: {
    color: "#777",
    fontSize: 15,
  },
});