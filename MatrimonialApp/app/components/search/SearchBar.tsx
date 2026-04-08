import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <Ionicons name="search" size={18} color="#7A1120" style={styles.icon} />

      {/* Input */}
      <TextInput
        placeholder="Search by name, city, profession..."
        placeholderTextColor="#9A8C84"
        value={value}
        onChangeText={onChange}
        style={styles.input}
        returnKeyType="search"
      />

      {/* Clear Button */}
      {value.trim().length > 0 && (
        <TouchableOpacity onPress={() => onChange("")} style={styles.clearBtn}>
          <Ionicons name="close-circle" size={20} color="#B08B3E" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "#FFF8F2",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: "#E8D9C8",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#2F2F2F",
    fontWeight: "500",
  },

  clearBtn: {
    marginLeft: 8,
  },
});