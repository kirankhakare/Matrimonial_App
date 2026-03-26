import { View, FlatList, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../../components/header/Header";
import SearchBar from "../../components/search/SearchBar";
import FilterTabs from "../../components/search/FilterTabs";
import BiodataCard from "../../components/biodata/BiodataCard";

export default function AllBiodataPage() {
  const [search, setSearch] = useState("");

  const data = [
    {
      id: 1,
      name: "Rahul Patil",
      age: 28,
      city: "Pune",
      profession: "Engineer",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      isPremium: true,
      isVerified: true,
    },
    {
      id: 2,
      name: "Amit Sharma",
      age: 30,
      city: "Mumbai",
      profession: "Doctor",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      isPremium: false,
      isVerified: true,
    },
    {
      id: 3,
      name: "Rohit Deshmukh",
      age: 27,
      city: "Nagpur",
      profession: "Business",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      isPremium: true,
      isVerified: false,
    },
    {
      id: 4,
      name: "Sagar Joshi",
      age: 29,
      city: "Nashik",
      profession: "Teacher",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
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

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.gradient}
    >
      {/* HEADER */}
      <Header title="All Biodata" showBack showProfile={false} />

      <View style={styles.container}>

        {/* SEARCH */}
        <SearchBar value={search} onChange={setSearch} />

        {/* FILTERS */}
        <FilterTabs />

        {/* RESULT COUNT */}
        <Text style={styles.resultText}>
          {filteredData.length} Profiles Found
        </Text>

        {/* LIST */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BiodataCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
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

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  resultText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7A1120",
    marginTop: 10,
    marginBottom: 12,
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