import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

type Biodata = {
  id: number;
  name: string;
  age: number;
  city: string;
  profession: string;
};

type Props = {
  data: Biodata;
};

export default function BiodataCard({ data }: Props) {

  const handleView = () => {
  router.push({
    pathname: "/details/[id]",
    params: { id: data.id.toString() }
  });
};

  return (
    <View style={styles.card}>

      <Image
        source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
        style={styles.image}
      />

      <View style={styles.info}>

        <Text style={styles.name}>{data.name}</Text>

        <Text style={styles.meta}>
          {data.age} yrs • {data.city}
        </Text>

        <Text style={styles.profession}>
          {data.profession}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleView}
        >
          <Text style={styles.buttonText}>
            View More
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card:{
    flexDirection:"row",
    backgroundColor:"#fff",
    marginBottom:12,
    borderRadius:10,
    overflow:"hidden",
    elevation:3
  },

  image:{
    width:110,
    height:110
  },

  info:{
    flex:1,
    padding:10,
    justifyContent:"center"
  },

  name:{
    fontSize:16,
    fontWeight:"bold",
    marginBottom:3
  },

  meta:{
    color:"#666"
  },

  profession:{
    marginTop:3
  },

  button:{
    marginTop:8,
    backgroundColor:"#ff4d4d",
    paddingVertical:6,
    paddingHorizontal:10,
    borderRadius:6,
    alignSelf:"flex-start"
  },

  buttonText:{
    color:"#fff",
    fontSize:12,
    fontWeight:"600"
  }

});