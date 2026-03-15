import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import SearchBar from "../components/search/SearchBar";
import FilterTabs from "../components/search/FilterTabs";
import BiodataCard from "../components/biodata/BiodataCard";

export default function Search() {

  const [search, setSearch] = useState("");

  const data = [
    { id: 1, name: "Rahul Patil", age: 28, city: "Pune", profession: "Engineer" },
    { id: 2, name: "Amit Sharma", age: 30, city: "Mumbai", profession: "Doctor" },
    { id: 3, name: "Rohit Deshmukh", age: 27, city: "Nagpur", profession: "Business" },
    { id: 4, name: "Sagar Joshi", age: 29, city: "Nashik", profession: "Teacher" }
  ];

  // Filter profiles
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.city.toLowerCase().includes(search.toLowerCase()) ||
    item.profession.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <LinearGradient
      colors={["#FFF5F0", "#FFFFFF", "#F9F0FF"]}
      style={styles.gradient}
    >

      <View style={styles.container}>

        <Text style={styles.title}>Search Biodata</Text>

        {/* Search Bar */}
        <SearchBar value={search} onChange={setSearch} />

        {/* Filter Tabs */}
        <FilterTabs />

        {/* Results */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BiodataCard data={item} />}
          showsVerticalScrollIndicator={false}
        />

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  gradient:{
    flex:1
  },

  container:{
    flex:1,
    padding:15
  },

  title:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:10,
    color:"#333"
  }

});