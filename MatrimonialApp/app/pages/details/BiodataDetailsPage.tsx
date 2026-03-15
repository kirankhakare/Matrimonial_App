import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/header/Header";
import { Ionicons } from "@expo/vector-icons";

export default function BiodataDetailsPage() {

  return (

    <LinearGradient
      colors={["#FFF5F0", "#FFFFFF", "#F9F0FF"]}
      style={styles.gradient}
    >

      <Header title="Biodata Details" />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://picsum.photos/200" }}
            style={styles.profileImage}
          />

          <Text style={styles.name}>Rahul Patil</Text>
          <Text style={styles.meta}>28 yrs • Pune</Text>
        </View>

        {/* Biodata Info Card */}
        <View style={styles.card}>

          <Text style={styles.label}>Profession</Text>
          <Text style={styles.value}>Engineer</Text>

          <Text style={styles.label}>Education</Text>
          <Text style={styles.value}>BE Mechanical</Text>

          <Text style={styles.label}>Religion</Text>
          <Text style={styles.value}>Jain</Text>

        </View>

        {/* Locked Section */}
        <View style={styles.lockCard}>

          <View style={styles.lockRow}>
            <Ionicons name="lock-closed" size={18} color="#FF6B00" />
            <Text style={styles.lockText}>Contact Number Locked</Text>
          </View>

          <View style={styles.lockRow}>
            <Ionicons name="lock-closed" size={18} color="#FF6B00" />
            <Text style={styles.lockText}>Family Details Locked</Text>
          </View>

        </View>

        {/* Unlock Button */}
        <TouchableOpacity style={styles.unlockButton}>
          <Text style={styles.unlockText}>Unlock Contact</Text>
        </TouchableOpacity>

      </ScrollView>

    </LinearGradient>

  );
}

const styles = StyleSheet.create({

  gradient:{
    flex:1
  },

  profileContainer:{
    alignItems:"center",
    marginTop:20
  },

  profileImage:{
    width:120,
    height:120,
    borderRadius:60,
    marginBottom:10
  },

  name:{
    fontSize:20,
    fontWeight:"bold"
  },

  meta:{
    color:"#777"
  },

  card:{
    backgroundColor:"#fff",
    margin:16,
    padding:16,
    borderRadius:12,
    elevation:3
  },

  label:{
    fontSize:13,
    color:"#777",
    marginTop:10
  },

  value:{
    fontSize:16,
    fontWeight:"600"
  },

  lockCard:{
    backgroundColor:"#fff",
    marginHorizontal:16,
    padding:16,
    borderRadius:12,
    elevation:3
  },

  lockRow:{
    flexDirection:"row",
    alignItems:"center",
    marginVertical:5
  },

  lockText:{
    marginLeft:8,
    color:"#FF6B00",
    fontWeight:"600"
  },

  unlockButton:{
    backgroundColor:"#FF6B00",
    margin:20,
    paddingVertical:14,
    borderRadius:30,
    alignItems:"center"
  },

  unlockText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  }

});