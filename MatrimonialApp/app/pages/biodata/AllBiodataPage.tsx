import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import SearchBar from "../../components/search/SearchBar";
import FilterTabs from "../../components/search/FilterTabs";
import BiodataCard from "../../components/biodata/BiodataCard";

export default function AllBiodataPage() {
  const [search, setSearch] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    const sub = await AsyncStorage.getItem("isSubscribed");
    setIsSubscribed(sub === "true");
  };

  const data = [
    {
      id: 1,
      name: "Rahul Patil",
      age: 28,
      city: "Pune",
      profession: "Software Engineer",
      subcast: "Maratha",
      height: "5'8\"",
      image: require("../../../assets/resently/resently1.jpg"),
      isPremium: true,
      isVerified: true,
    },
    {
      id: 2,
      name: "Amit Sharma",
      age: 30,
      city: "Mumbai",
      profession: "Doctor",
      subcast: "Brahmin",
      height: "5'10\"",
      image: require("../../../assets/resently/resently2.jpg"),
      isPremium: false,
      isVerified: true,
    },
    {
      id: 3,
      name: "Rohit Deshmukh",
      age: 27,
      city: "Nagpur",
      profession: "Businessman",
      subcast: "Kunbi",
      height: "5'9\"",
      image: require("../../../assets/resently/resently3.jpg"),
      isPremium: true,
      isVerified: false,
    },
    {
      id: 4,
      name: "Sagar Joshi",
      age: 29,
      city: "Nashik",
      profession: "Teacher",
      subcast: "Brahmin",
      height: "5'7\"",
      image: require("../../../assets/resently/resently4.jpg"),
      isPremium: false,
      isVerified: true,
    },
  ];

  // Search Filter
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.city.toLowerCase().includes(search.toLowerCase()) ||
    item.profession.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewProfile = (id: number) => {
    if (!isSubscribed) {
      router.push("/subscription");
    } else {
      router.push(`/details/${id}`);
    }
  };

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.gradient}
    >
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* CUSTOM TOP BAR */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#7A1120" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>All Biodata</Text>

        <View style={{ width: 42 }} />
      </View>

      <View style={styles.container}>
        {/* SEARCH */}
        <SearchBar value={search} onChange={setSearch} />

        {/* FILTERS */}
        <FilterTabs />

        {/* RESULT COUNT */}
        <Text style={styles.resultText}>
          {filteredData.length} Profiles Found
        </Text>

        {/* LOCK BANNER */}
        {!isSubscribed && (
          <TouchableOpacity
            style={styles.lockBanner}
            onPress={() => router.push("/subscription")}
          >
            <Ionicons name="lock-closed" size={18} color="#7A1120" />
            <Text style={styles.lockBannerText}>
              Subscribe to unlock full biodata details
            </Text>
          </TouchableOpacity>
        )}

        {/* LIST */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BiodataCard
              data={item}
              isSubscribed={isSubscribed}
              onView={() => handleViewProfile(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>No Profiles Found 😔</Text>
              <Text style={styles.emptySub}>
                Try a different search or filter
              </Text>
            </View>
          }
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 52,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  backBtn: {
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
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#7A1120",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  resultText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7A1120",
    marginTop: 10,
    marginBottom: 12,
  },

  lockBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E6",
    borderColor: "#F4D7B5",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 14,
  },

  lockBannerText: {
    marginLeft: 10,
    color: "#7A1120",
    fontWeight: "700",
    fontSize: 13,
    flex: 1,
  },

  emptyBox: {
    marginTop: 60,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#7A1120",
  },

  emptySub: {
    fontSize: 13,
    color: "#777",
    marginTop: 6,
    textAlign: "center",
  },
});