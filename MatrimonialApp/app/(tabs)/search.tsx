import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import SearchBar from "../components/search/SearchBar";
import FilterTabs from "../components/search/FilterTabs";
import BiodataCard from "../components/biodata/BiodataCard";

export default function Search() {
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
      profession: "Engineer",
      subcast: "Maratha",
      height: "5'8\"",
      image: require("../../assets/resently/resently1.jpg"),
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
      image: require("../../assets/resently/resently2.jpg"),
      isPremium: false,
      isVerified: true,
    },
    {
      id: 3,
      name: "Rohit Deshmukh",
      age: 27,
      city: "Nagpur",
      profession: "Business",
      subcast: "Kunbi",
      height: "5'9\"",
      image: require("../../assets/resently/resently3.jpg"),
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
      image: require("../../assets/resently/resently4.jpg"),
      isPremium: false,
      isVerified: true,
    },
  ];

  // 🔍 Search Filter
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.city.toLowerCase().includes(search.toLowerCase()) ||
    item.profession.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (id: number) => {
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

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Search Profiles</Text>
      </View>

      <View style={styles.container}>
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Find profiles by name, city or profession
        </Text>

        {/* Search Bar */}
        <SearchBar value={search} onChange={setSearch} />

        {/* Filters */}
        <FilterTabs />

        {/* Result Count */}
        <Text style={styles.resultText}>
          {filteredData.length} Profiles Found
        </Text>

        {/* LOCK NOTICE */}
        {!isSubscribed && (
          <TouchableOpacity
            style={styles.lockBanner}
            onPress={() => router.push("/subscription")}
          >
            <Ionicons name="lock-closed" size={16} color="#7A1120" />
            <Text style={styles.lockText}>
              Subscribe to view full details
            </Text>
          </TouchableOpacity>
        )}

        {/* RESULTS */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BiodataCard
              data={item}
              isSubscribed={isSubscribed}
              onView={() => handleView(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>No Profiles Found 😔</Text>
              <Text style={styles.emptySub}>
                Try a different search
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
    paddingTop: 60,
    paddingBottom: 10,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#7A1120",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginBottom: 12,
    textAlign: "center",
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
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F4D7B5",
  },

  lockText: {
    marginLeft: 8,
    color: "#7A1120",
    fontWeight: "700",
  },

  emptyBox: {
    marginTop: 60,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7A1120",
  },

  emptySub: {
    fontSize: 13,
    color: "#777",
    marginTop: 6,
  },
});