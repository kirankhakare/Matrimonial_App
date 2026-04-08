import React, { useEffect, useMemo, useState } from "react";
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
  const [selectedFilter, setSelectedFilter] = useState("All");
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
      education: "B.Tech",
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
      education: "MBBS",
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
      education: "MBA",
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
      education: "M.A",
      height: "5'7\"",
      image: require("../../assets/resently/resently4.jpg"),
      isPremium: false,
      isVerified: true,
    },
  ];

  const normalizedSearch = search.trim().toLowerCase();

  const filteredData = useMemo(() => {
    let result = [...data];

    // 🔍 Common Search
    if (normalizedSearch) {
      result = result.filter((item) => {
        return (
          item.name.toLowerCase().includes(normalizedSearch) ||
          item.city.toLowerCase().includes(normalizedSearch) ||
          item.profession.toLowerCase().includes(normalizedSearch) ||
          item.subcast.toLowerCase().includes(normalizedSearch) ||
          item.education.toLowerCase().includes(normalizedSearch) ||
          item.age.toString().includes(normalizedSearch)
        );
      });
    }

    // 🎯 FilterTabs Logic
    switch (selectedFilter) {
      case "Premium":
        result = result.filter((item) => item.isPremium);
        break;

      case "City":
        if (normalizedSearch) {
          result = result.filter((item) =>
            item.city.toLowerCase().includes(normalizedSearch)
          );
        }
        break;

      case "Occupation":
        if (normalizedSearch) {
          result = result.filter((item) =>
            item.profession.toLowerCase().includes(normalizedSearch)
          );
        }
        break;

      case "Caste":
        if (normalizedSearch) {
          result = result.filter((item) =>
            item.subcast.toLowerCase().includes(normalizedSearch)
          );
        }
        break;

      case "Education":
        if (normalizedSearch) {
          result = result.filter((item) =>
            item.education.toLowerCase().includes(normalizedSearch)
          );
        }
        break;

      case "Age":
        if (normalizedSearch) {
          result = result.filter((item) =>
            item.age.toString().includes(normalizedSearch)
          );
        }
        break;

      case "All":
      default:
        break;
    }

    return result;
  }, [search, selectedFilter]);

  const handleView = (id: number) => {
    if (!isSubscribed) {
      router.push("/subscription/SubscriptionPage");
    } else {
      router.push(`/details/${id}`);
    }
  };

  const clearAllFilters = () => {
    setSearch("");
    setSelectedFilter("All");
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
          Find profiles by name, city, profession, caste or education
        </Text>

        {/* Search Bar */}
        <SearchBar value={search} onChange={setSearch} />

        {/* Filters */}
        <FilterTabs selected={selectedFilter} onSelect={setSelectedFilter} />

        {/* Selected Filter Badge */}
        {(selectedFilter !== "All" || search.trim().length > 0) && (
          <View style={styles.activeFilterRow}>
            <Text style={styles.activeFilterText}>
              Active: {selectedFilter}
              {search.trim() ? ` • "${search}"` : ""}
            </Text>

            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={styles.clearAllText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Result Count */}
        <Text style={styles.resultText}>
          {filteredData.length} Profiles Found
        </Text>

        {/* LOCK NOTICE */}
        {!isSubscribed && (
          <TouchableOpacity
            style={styles.lockBanner}
            onPress={() => router.push("/subscription/SubscriptionPage")}
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
                Try changing search or filters
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

  activeFilterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FFF4EC",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F1D7BA",
  },

  activeFilterText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7A1120",
  },

  clearAllText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#B08B3E",
  },

  resultText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7A1120",
    marginTop: 4,
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