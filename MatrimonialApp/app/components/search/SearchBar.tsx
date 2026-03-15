import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {

  return (
    <View style={styles.container}>

      <Ionicons name="search" size={18} color="#888" style={styles.icon} />

      <TextInput
        placeholder="Search by name, city, profession..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flexDirection:"row",
    alignItems:"center",
    marginHorizontal:16,
    marginBottom:12,
    backgroundColor:"#fff",
    borderRadius:25,
    paddingHorizontal:14,
    paddingVertical:10,
    shadowColor:"#000",
    shadowOpacity:0.05,
    shadowRadius:5,
    elevation:2
  },

  icon:{
    marginRight:8
  },

  input:{
    flex:1,
    fontSize:14
  }

});