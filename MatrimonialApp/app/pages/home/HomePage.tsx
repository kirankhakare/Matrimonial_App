import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Image
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import BiodataCard from "../../components/biodata/BiodataCard";
import AdvertisementRow from "../../components/ads/AdvertisementRow";

export default function HomePage() {

  const scrollRef = useRef<ScrollView>(null);

  const sliderImages = [
    "https://picsum.photos/600/200?1",
    "https://picsum.photos/600/200?2",
    "https://picsum.photos/600/200?3",
    "https://picsum.photos/600/200?4"
  ];

  let scrollIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      scrollIndex++;

      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: scrollIndex * 320,
          animated: true
        });
      }

      if (scrollIndex >= sliderImages.length - 1) {
        scrollIndex = -1;
      }

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const biodata = [
    { id: 1, name: "Rahul Patil", age: 28, city: "Pune", profession: "Engineer", image: "" },
    { id: 2, name: "Amit Sharma", age: 30, city: "Mumbai", profession: "Doctor", image: "" },
    { id: 3, name: "Rohit Deshmukh", age: 27, city: "Nagpur", profession: "Business", image: "" }
  ];

  return (

    <LinearGradient
      colors={["#FFF5F0", "#FFFFFF", "#F9F0FF"]}
      style={styles.gradient}
    >

      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>MatriMilan</Text>

          <TouchableOpacity>
            <Ionicons name="person-circle-outline" size={32} color="#FF6B00" />
          </TouchableOpacity>
        </View>

        {/* Image Slider */}
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
              style={styles.sliderImage}
            />
          ))}
        </ScrollView>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Recently Added Profiles</Text>

        {/* Biodata Cards */}
        {biodata.map((item) => (
          <BiodataCard key={item.id} data={item} />
        ))}

        {/* View All Button */}
        <TouchableOpacity
          style={styles.nextPage}
          onPress={() => router.push("/biodata/all")}
        >
          <Text style={styles.nextText}>View All Profiles</Text>
        </TouchableOpacity>

        {/* Ads */}
        <AdvertisementRow />

      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  gradient:{
    flex:1
  },

  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingTop:50,
    paddingHorizontal:16,
    marginBottom:10
  },

  logo:{
    fontSize:22,
    fontWeight:"bold",
    color:"#FF6B00"
  },

  slider:{
    marginHorizontal:16,
    marginBottom:20
  },

  sliderImage:{
    width:320,
    height:160,
    borderRadius:12,
    marginRight:10
  },

  sectionTitle:{
    fontSize:18,
    fontWeight:"bold",
    marginHorizontal:16,
    marginBottom:10
  },

  nextPage:{
    backgroundColor:"#FF6B00",
    marginHorizontal:20,
    marginVertical:15,
    paddingVertical:12,
    borderRadius:30,
    alignItems:"center"
  },

  nextText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  }

});