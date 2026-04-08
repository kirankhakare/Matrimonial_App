import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";

const filters = [
  "All",
  "Education",
  "Caste",
  "Occupation",
  "City",
];

type Props = {
  selected: string;
  onSelect: (value: string) => void;
};

export default function FilterTabs({ selected, onSelect }: Props) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {filters.map((item) => {
          const active = selected === item;

          return (
            <TouchableOpacity
              key={item}
              style={[styles.tab, active && styles.activeTab]}
              onPress={() => onSelect(item)}
              activeOpacity={0.85}
            >
              <Text style={[styles.tabText, active && styles.activeTabText]}>
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
    marginBottom: 14,
  },

  container: {
    paddingRight: 8,
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: "#FFF8F2",
    borderWidth: 1,
    borderColor: "#E8D9C8",
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: "#7A1120",
    borderColor: "#7A1120",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  tabText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7A1120",
  },

  activeTabText: {
    color: "#FFF",
  },
});