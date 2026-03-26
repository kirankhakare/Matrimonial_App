import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../../components/header/Header";
import RecentBiodataSlider from "../../pages/home/RecentBiodataSlider";
import BiodataCard from "../../components/biodata/BiodataCard";
import AdvertisementRow from "../../components/ads/AdvertisementRow";

const { width } = Dimensions.get("window");

export default function HomePage() {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderImages = [
    "https://picsum.photos/600/200?1",
    "https://picsum.photos/600/200?2",
    "https://picsum.photos/600/200?3",
    "https://picsum.photos/600/200?4",
  ];

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % sliderImages.length;

      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 32),
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Recently Added
  const recentData = [
    {
      id: 1,
      name: "Rahul Patil",
      age: 28,
      city: "Pune",
      photo: "https://randomuser.me/api/portraits/men/3.jpg",
      isPremium: true,
      isVerified: true,
    },
    {
      id: 2,
      name: "Sneha Joshi",
      age: 25,
      city: "Mumbai",
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
      isPremium: false,
      isVerified: true,
    },
    {
      id: 3,
      name: "Amit Sharma",
      age: 30,
      city: "Nagpur",
      photo: "https://randomuser.me/api/portraits/men/4.jpg",
      isPremium: true,
      isVerified: false,
    },
    {
      id: 4,
      name: "Pooja Deshmukh",
      age: 24,
      city: "Amravati",
      photo: "https://randomuser.me/api/portraits/women/5.jpg",
      isPremium: false,
      isVerified: true,
    },
  ];

  // Main Biodata Cards
  const biodata = [
    { id: 1, name: "Rahul Patil", age: 28, city: "Pune", profession: "Engineer", image: "" },
    { id: 2, name: "Amit Sharma", age: 30, city: "Mumbai", profession: "Doctor", image: "" },
    { id: 3, name: "Rohit Deshmukh", age: 27, city: "Nagpur", profession: "Business", image: "" },
  ];

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.gradient}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <Header />

        {/* TOP IMAGE SLIDER */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          style={styles.slider}
        >
          {sliderImages.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={[styles.sliderImage, { width: width - 32 }]}
            />
          ))}
        </ScrollView>

        {/* SUBSCRIPTION BANNER */}
        <View style={styles.subscriptionBox}>
          <Text style={styles.subTitle}>₹100 मध्ये 1 वर्ष Premium 🔓</Text>
          <Text style={styles.subText}>
            Contact details, full biodata आणि premium profiles unlock करा
          </Text>

          <TouchableOpacity style={styles.subBtn}>
            <Text style={styles.subBtnText}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>

        {/* RECENTLY ADDED */}
        <View style={styles.sectionWrap}>
          <RecentBiodataSlider data={recentData} />
        </View>

        {/* ALL PROFILES */}
        <Text style={styles.sectionTitle}>सर्व प्रोफाइल्स</Text>

        {biodata.map((item) => (
          <BiodataCard key={item.id} data={item} />
        ))}

        {/* VIEW ALL */}
        <TouchableOpacity
          style={styles.nextPage}
          onPress={() => router.push("/biodata/all")}
        >
          <Text style={styles.nextText}>View All Profiles</Text>
        </TouchableOpacity>

        {/* ADS */}
        <AdvertisementRow />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  slider: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 18,
  },

  sliderImage: {
    height: 170,
    borderRadius: 18,
    marginRight: 10,
  },

  subscriptionBox: {
    backgroundColor: "#FFF3E6",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F4D7B5",
  },

  subTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#7A1120",
  },

  subText: {
    fontSize: 13,
    color: "#555",
    marginTop: 5,
    lineHeight: 19,
  },

  subBtn: {
    backgroundColor: "#7A1120",
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  subBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  sectionWrap: {
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
    color: "#222",
  },

  nextPage: {
    backgroundColor: "#7A1120",
    marginHorizontal: 20,
    marginVertical: 18,
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: "center",
  },

  nextText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});