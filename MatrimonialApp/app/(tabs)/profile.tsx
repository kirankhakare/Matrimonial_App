import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {

  return (

    <LinearGradient
      colors={["#FFF5F0", "#FFFFFF", "#F9F0FF"]}
      style={styles.gradient}
    >

      <ScrollView>

        {/* Profile Header */}
        <View style={styles.profileHeader}>

          <Image
            source={{ uri: "https://picsum.photos/200" }}
            style={styles.avatar}
          />

          <Text style={styles.name}>Rahul Patil</Text>

          <Text style={styles.meta}>28 yrs • Pune</Text>

        </View>

        {/* Profile Card */}
        <View style={styles.card}>

          <Text style={styles.label}>Profession</Text>
          <Text style={styles.value}>Engineer</Text>

          <Text style={styles.label}>Education</Text>
          <Text style={styles.value}>BE Mechanical</Text>

          <Text style={styles.label}>Religion</Text>
          <Text style={styles.value}>Jain</Text>

        </View>

        {/* Menu Options */}
        <View style={styles.menuCard}>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="create-outline" size={20} color="#FF6B00" />
            <Text style={styles.menuText}>Edit Biodata</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card-outline" size={20} color="#FF6B00" />
            <Text style={styles.menuText}>Subscription Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={20} color="#FF6B00" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </LinearGradient>

  );
}

const styles = StyleSheet.create({

  gradient:{
    flex:1
  },

  profileHeader:{
    alignItems:"center",
    marginTop:40,
    marginBottom:20
  },

  avatar:{
    width:110,
    height:110,
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
    marginHorizontal:16,
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

  menuCard:{
    backgroundColor:"#fff",
    margin:16,
    borderRadius:12,
    paddingVertical:10,
    elevation:3
  },

  menuItem:{
    flexDirection:"row",
    alignItems:"center",
    padding:14,
    borderBottomWidth:1,
    borderBottomColor:"#f0f0f0"
  },

  menuText:{
    marginLeft:10,
    fontSize:15
  }

});