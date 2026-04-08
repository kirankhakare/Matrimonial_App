import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import SearchBar from "../../components/search/SearchBar";
import FilterTabs from "../../components/search/FilterTabs";
import BiodataCard from "../../components/biodata/BiodataCard";
import { getAllBiodata } from "../../../services/biodataService";

export default function AllBiodataPage() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscription();
    fetchBiodata();
  }, []);

  const checkSubscription = async () => {
    const sub = await AsyncStorage.getItem("isSubscribed");
    setIsSubscribed(sub === "true");
  };

  const fetchBiodata = async () => {
    try {
      const res = await getAllBiodata();
      setData(res.data || []);
    } catch (error) {
      console.log("All Biodata Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const normalizedSearch = search.trim().toLowerCase();

  const filteredData = useMemo(() => {
    let result = [...data];

    // 🔍 SEARCH LOGIC
    if (normalizedSearch) {
      result = result.filter((item) => {
        const name = item.name?.toLowerCase() || "";
        const city = item.placeOfBirth?.toLowerCase() || "";
        const profession = item.job?.toLowerCase() || "";
        const caste = item.caste?.toLowerCase() || "";
        const education = item.education?.toLowerCase() || "";
        const age = item.age?.toString() || "";

        return (
          name.includes(normalizedSearch) ||
          city.includes(normalizedSearch) ||
          profession.includes(normalizedSearch) ||
          caste.includes(normalizedSearch) ||
          education.includes(normalizedSearch) ||
          age.includes(normalizedSearch)
        );
      });
    }

    // 🎯 FILTER LOGIC
    switch (selectedFilter) {
      case "Premium":
        result = result.filter((item) => item.isPremium === true);
        break;

      case "City":
        if (normalizedSearch) {
          result = result.filter((item) =>
            item.placeOfBirth?.toLowerCase().includes(normalizedSearch)
          );
        }
        break;

      case "Occupation":
        if (normalizedSearch) {
          result = result.filter((item) =>
            item.job?.toLowerCase().includes(normalizedSearch)
          );
        }
        break;

      case "Caste":
        if (normalizedSearch) {
          result = result.filter((item) =>
            item.caste?.toLowerCase().includes(normalizedSearch)
          );
        }
        break;

      case "Education":
        if (normalizedSearch) {
          result = result.filter((item) =>
            item.education?.toLowerCase().includes(normalizedSearch)
          );
        }
        break;

      case "Age":
        if (normalizedSearch) {
          result = result.filter((item) =>
            item.age?.toString().includes(normalizedSearch)
          );
        }
        break;

      case "All":
      default:
        break;
    }

    return result;
  }, [data, search, selectedFilter]);

  const handleViewProfile = (id: string) => {
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
      style={styles.gradient}
    >
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* TOP BAR */}
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
        <FilterTabs selected={selectedFilter} onSelect={setSelectedFilter} />

        {/* ACTIVE FILTER */}
        {(selectedFilter !== "All" || search.trim()) && (
          <View style={styles.activeFilterRow}>
            <Text style={styles.activeFilterText}>
              Active: {selectedFilter}
              {search ? ` • "${search}"` : ""}
            </Text>

            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* RESULT COUNT */}
        <Text style={styles.resultText}>
          {filteredData.length} Profiles Found
        </Text>

        {/* LOCK */}
        {!isSubscribed && (
          <TouchableOpacity
            style={styles.lockBanner}
            onPress={() => router.push("/subscription/SubscriptionPage")}
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
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <BiodataCard
              data={item}
              isSubscribed={isSubscribed}
              onView={() => handleViewProfile(item._id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>No Profiles Found</Text>
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
  gradient: { flex: 1 },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8F2",
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
  },

  activeFilterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF4EC",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },

  activeFilterText: {
    fontWeight: "700",
    color: "#7A1120",
  },

  clearText: {
    color: "#B08B3E",
    fontWeight: "800",
  },

  resultText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7A1120",
    marginBottom: 10,
  },

  lockBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E6",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },

  lockBannerText: {
    marginLeft: 10,
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