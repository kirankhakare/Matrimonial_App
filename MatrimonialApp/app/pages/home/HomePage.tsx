import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RecentBiodataSlider from "../../pages/home/RecentBiodataSlider";
import BiodataCard from "../../components/biodata/BiodataCard";
import AdvertisementRow from "../../components/ads/AdvertisementRow";

export default function HomePage() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    const sub = await AsyncStorage.getItem("isSubscribed");
    setIsSubscribed(sub === "true");
  };

  // Recently Added Data
  const recentData = [
    {
      id: 1,
      name: "Shruti Verma",
      age: 26,
      city: "Thane | Mumbai",
      image: require("../../../assets/resently/resently1.jpg"),
      height: "5'1\"",
      subcast: "Digambar",
      profession: "Software Developer",
      isPremium: true,
      isVerified: true,
    },
    {
      id: 2,
      name: "Pooja Deshmukh",
      age: 24,
      city: "Pune",
      image: require("../../../assets/resently/resently2.jpg"),
      height: "5'3\"",
      subcast: "Maratha",
      profession: "Teacher",
      isPremium: false,
      isVerified: true,
    },
  ];

  // All Profiles
  const biodata = [
    { id: 1, name: "Rahul Patil", age: 28, city: "Pune", profession: "Engineer", image: require("../../../assets/resently/resently1.jpg")},
    
    { id: 2, name: "Amit Sharma", age: 30, city: "Mumbai", profession: "Doctor" , image: require("../../../assets/resently/resently2.jpg")},
  ];

  const handleView = (id: number) => {
    if (!isSubscribed) {
      router.push("/subscription"); // 🔒 redirect
    } else {
      router.push(`/details/${id}`); // ✅ open profile
    }
  };

  return (
    <LinearGradient colors={["#FFF8F2", "#FFFFFF"]} style={styles.container}>
      <StatusBar barStyle="dark-content" translucent />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 🔥 RECENTLY ADDED FULL IMAGE SLIDER */}
        <RecentBiodataSlider data={recentData} isSubscribed={isSubscribed} />

        {/* 🔽 ALL PROFILES */}
        <Text style={styles.title}>सर्व प्रोफाइल्स</Text>

        {biodata.map((item) => (
          <BiodataCard
            key={item.id}
            data={item}
            isSubscribed={isSubscribed}
            onView={() => handleView(item.id)}
          />
        ))}

        {/* VIEW ALL */}
        <TouchableOpacity
          style={styles.viewAllBtn}
          onPress={() => {
            if (!isSubscribed) {
              router.push("/subscription");
            } else {
              router.push("/biodata/all");
            }
          }}
        >
          <Text style={styles.viewAllText}>View All Profiles</Text>
        </TouchableOpacity>

        {/* ADS */}
        <AdvertisementRow />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
    color: "#222",
  },

  viewAllBtn: {
    backgroundColor: "#7A1120",
    marginHorizontal: 20,
    marginVertical: 18,
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: "center",
  },

  viewAllText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});