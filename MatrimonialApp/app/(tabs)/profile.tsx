import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/header/Header";

export default function Profile() {

  const isPremium = true; // 🔹 later backend varun yeil

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.gradient}
    >

      {/* HEADER */}
      <Header title="My Profile" showBack={false} showProfile={false} />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* PROFILE HEADER */}
        <View style={styles.profileHeader}>

          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              style={styles.avatar}
            />

            {/* Verified Badge */}
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
            </View>
          </View>

          <Text style={styles.name}>Rahul Patil</Text>
          <Text style={styles.meta}>28 yrs • Pune</Text>

        </View>

        {/* 🔥 SUBSCRIPTION CARD */}
        <View style={styles.subscriptionCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.subTitle}>
              {isPremium ? "Premium Active 💎" : "Upgrade to Premium"}
            </Text>

            <Text style={styles.subText}>
              {isPremium
                ? "Valid till: 25 Mar 2027"
                : "Unlock full biodata & contact details"}
            </Text>
          </View>

          <TouchableOpacity style={styles.subBtn}>
            <Text style={styles.subBtnText}>
              {isPremium ? "Renew" : "Buy ₹100"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* PROFILE INFO */}
        <View style={styles.card}>

          <View style={styles.row}>
            <Text style={styles.label}>Profession</Text>
            <Text style={styles.value}>Engineer</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Education</Text>
            <Text style={styles.value}>BE Mechanical</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Religion</Text>
            <Text style={styles.value}>Jain</Text>
          </View>

        </View>

        {/* MENU */}
        <View style={styles.menuCard}>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="create-outline" size={20} color="#7A1120" />
            <Text style={styles.menuText}>Edit Biodata</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card-outline" size={20} color="#7A1120" />
            <Text style={styles.menuText}>Subscription Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="heart-outline" size={20} color="#7A1120" />
            <Text style={styles.menuText}>Saved Profiles</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="eye-outline" size={20} color="#7A1120" />
            <Text style={styles.menuText}>Viewed Profiles</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text style={[styles.menuText, { color: "#DC2626" }]}>
              Logout
            </Text>
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
    marginTop:20,
    marginBottom:20
  },

  avatarWrapper:{
    position:"relative"
  },

  avatar:{
    width:110,
    height:110,
    borderRadius:60,
    borderWidth:3,
    borderColor:"#E8D9C8"
  },

  verifiedBadge:{
    position:"absolute",
    bottom:5,
    right:5,
    backgroundColor:"#fff",
    borderRadius:20
  },

  name:{
    fontSize:20,
    fontWeight:"800",
    marginTop:10,
    color:"#7A1120"
  },

  meta:{
    color:"#777",
    marginTop:2
  },

  subscriptionCard:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#FFF3E6",
    marginHorizontal:16,
    padding:14,
    borderRadius:16,
    marginBottom:16,
    borderWidth:1,
    borderColor:"#F4D7B5"
  },

  subTitle:{
    fontSize:15,
    fontWeight:"700",
    color:"#7A1120"
  },

  subText:{
    fontSize:12,
    color:"#555",
    marginTop:3
  },

  subBtn:{
    backgroundColor:"#7A1120",
    paddingHorizontal:14,
    paddingVertical:8,
    borderRadius:8
  },

  subBtnText:{
    color:"#fff",
    fontSize:12,
    fontWeight:"700"
  },

  card:{
    backgroundColor:"#fff",
    marginHorizontal:16,
    padding:16,
    borderRadius:14,
    elevation:2
  },

  row:{
    marginBottom:12
  },

  label:{
    fontSize:12,
    color:"#888"
  },

  value:{
    fontSize:15,
    fontWeight:"600",
    color:"#222"
  },

  menuCard:{
    backgroundColor:"#fff",
    margin:16,
    borderRadius:14,
    paddingVertical:10,
    elevation:2
  },

  menuItem:{
    flexDirection:"row",
    alignItems:"center",
    padding:14,
    borderBottomWidth:1,
    borderBottomColor:"#f0f0f0"
  },

  menuText:{
    marginLeft:12,
    fontSize:15,
    fontWeight:"500",
    color:"#333"
  }

});