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
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChange("")}>
          <Ionicons name="close-circle" size={18} color="#B08B3E" />
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#FFF8F2",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E8D9C8",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});