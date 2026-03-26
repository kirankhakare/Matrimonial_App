import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../components/header/Header";
import SearchBar from "../components/search/SearchBar";
import FilterTabs from "../components/search/FilterTabs";
import BiodataCard from "../components/biodata/BiodataCard";

export default function Search() {
  const [search, setSearch] = useState("");

  const data = [
    {
      id: 1,
      name: "Rahul Patil",
      age: 28,
      city: "Pune",
      profession: "Engineer",
      isPremium: true,
      isVerified: true,
    },
    {
      id: 2,
      name: "Amit Sharma",
      age: 30,
      city: "Mumbai",
      profession: "Doctor",
      isPremium: false,
      isVerified: true,
    },
    {
      id: 3,
      name: "Rohit Deshmukh",
      age: 27,
      city: "Nagpur",
      profession: "Business",
      isPremium: true,
      isVerified: false,
    },
    {
      id: 4,
      name: "Sagar Joshi",
      age: 29,
      city: "Nashik",
      profession: "Teacher",
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

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.gradient}
    >
      {/* HEADER */}
      <Header title="Search Biodata" showBack={false} showProfile={true} />

      <View style={styles.container}>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Search profiles by name, city or profession
        </Text>

        {/* Search Bar */}
        <SearchBar value={search} onChange={setSearch} />

        {/* Filter Tabs */}
        <FilterTabs />

        {/* Result Count */}
        <Text style={styles.resultText}>
          {filteredData.length} Profiles Found
        </Text>

        {/* Results */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BiodataCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginBottom: 12,
    lineHeight: 18,
  },

  resultText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7A1120",
    marginTop: 10,
    marginBottom: 12,
  },
});