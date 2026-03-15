import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function AdvertisementRow() {

  const scrollRef = useRef<ScrollView>(null);

  const ads = [
    "https://picsum.photos/300/120?1",
    "https://picsum.photos/300/120?2",
    "https://picsum.photos/300/120?3",
    "https://picsum.photos/300/120?4"
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

      if (scrollIndex >= ads.length - 1) {
        scrollIndex = -1;
      }

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <View style={styles.container}>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
      >

        {ads.map((item, index) => (
          <View key={index} style={styles.adBox}>
            <Image
              source={{ uri: item }}
              style={styles.image}
            />
          </View>
        ))}

      </ScrollView>

    </View>

  );
}

const styles = StyleSheet.create({

  container:{
    marginTop:15
  },

  adBox:{
    width:320,
    height:120,
    marginRight:10,
    borderRadius:10,
    overflow:"hidden"
  },

  image:{
    width:"100%",
    height:"100%"
  }

});