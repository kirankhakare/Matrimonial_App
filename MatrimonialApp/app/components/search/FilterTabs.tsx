import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const filters = ["All", "Education", "Caste", "Occupation"];

export default function FilterTabs() {

  return (
    <View style={styles.container}>
      {filters.map((item) => (
        <TouchableOpacity key={item} style={styles.tab}>
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginVertical:10
  },

  tab:{
    backgroundColor:"#eee",
    padding:8,
    borderRadius:5
  }
});