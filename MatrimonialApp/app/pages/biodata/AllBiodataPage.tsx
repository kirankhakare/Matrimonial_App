import { View, FlatList } from "react-native";
import Header from "../../components/header/Header";
import SearchBar from "../../components/search/SearchBar";
import FilterTabs from "../../components/search/FilterTabs";
import BiodataCard from "../../components/biodata/BiodataCard";
import { useState } from "react";
export default function AllBiodataPage() {
  const [search, setSearch] = useState("");
  const data = [
    { id: 1, name: "Rahul Patil", age: 28, city: "Pune", profession: "Engineer" },
    { id: 2, name: "Amit Sharma", age: 30, city: "Mumbai", profession: "Doctor" },
    { id: 3, name: "Rohit Deshmukh", age: 27, city: "Nagpur", profession: "Business" },
    { id: 4, name: "Sagar Joshi", age: 29, city: "Nashik", profession: "Teacher" }
  ];

  return (
    <View style={{ flex: 1 }}>

      <Header title="All Biodata" />

      <SearchBar value={search} onChange={setSearch} />

      <FilterTabs />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BiodataCard data={item} />}
      />

    </View>
  );
}