import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const filters = [
  "All",
  "Education",
  "Caste",
  "Occupation",
  "City",
  "Age",
  "Premium"
];

type Props = {
  onSelect?: (value: string) => void;
};

export default function FilterTabs({ onSelect }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleSelect = (item: string) => {
    setActiveFilter(item);
    onSelect?.(item);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {filters.map((item) => {
          const isActive = activeFilter === item;

          return (
            <TouchableOpacity
              key={item}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => handleSelect(item)}
              activeOpacity={0.85}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
    marginBottom: 10,
  },

  container: {
    paddingRight: 10,
  },

  tab: {
    backgroundColor: "#F5E6D3",
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E8D9C8",
  },

  activeTab: {
    backgroundColor: "#7A1120",
    borderColor: "#7A1120",
  },

  tabText: {
    color: "#7A1120",
    fontSize: 13,
    fontWeight: "700",
  },

  activeTabText: {
    color: "#fff",
  },
});