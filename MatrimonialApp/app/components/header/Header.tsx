import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {

  return (
    <View style={styles.container}>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#FF6B00" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Spacer */}
      <View style={styles.rightSpace} />

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingTop:50,
    paddingBottom:14,
    paddingHorizontal:18,
    backgroundColor:"#FFF5F0",
    borderBottomWidth:1,
    borderBottomColor:"#F0E6E2"
  },

  backButton:{
    width:32,
    height:32,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    backgroundColor:"#FFFFFF",
    shadowColor:"#000",
    shadowOpacity:0.05,
    shadowRadius:4,
    elevation:2
  },

  title:{
    fontSize:18,
    fontWeight:"700",
    color:"#333",
    letterSpacing:0.3
  },

  rightSpace:{
    width:32
  }

});