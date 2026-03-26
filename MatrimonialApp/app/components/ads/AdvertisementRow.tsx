import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";

const { width } = Dimensions.get("window");

export default function AdvertisementRow() {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 Dummy Ads Data (later backend/API la connect karu)
  const ads = [
    {
      id: 1,
      title: "Premium Membership Offer",
      image: "https://picsum.photos/600/220?1",
    },
    {
      id: 2,
      title: "New Verified Biodata Available",
      image: "https://picsum.photos/600/220?2",
    },
    {
      id: 3,
      title: "Unlock Contact Details",
      image: "https://picsum.photos/600/220?3",
    },
    {
      id: 4,
      title: "Special Matchmaking Offer",
      image: "https://picsum.photos/600/220?4",
    },
  ];

  // 🔄 Auto Scroll
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % ads.length;

      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 32),
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>

      {/* Section Title */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Special Highlights</Text>
      </View>

      {/* Ads Slider */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        contentContainerStyle={{ paddingRight: 10 }}
      >
        {ads.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.9} style={styles.adBox}>
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* Overlay */}
            <View style={styles.overlay}>
              <Text style={styles.adTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotContainer}>
        {ads.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 12,
  },

  headerRow: {
    marginBottom: 10,
    paddingHorizontal: 2,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: "#222",
  },

  adBox: {
    width: width - 32,
    height: 145,
    marginRight: 12,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  adTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#D6C7B8",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 18,
    backgroundColor: "#7A1120",
  },
});