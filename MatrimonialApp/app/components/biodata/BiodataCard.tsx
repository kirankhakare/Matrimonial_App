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
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={handleView}>
      
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
        style={styles.image}
      />

      <View style={styles.info}>

        <Text style={styles.name}>
          {data.name}
        </Text>

        <Text style={styles.meta}>
          {data.age} yrs • {data.city}
        </Text>

        <Text style={styles.profession}>
          {data.profession}
        </Text>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            View Profile →
          </Text>
        </View>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 14,
    borderRadius: 16,
    padding: 10,
    alignItems: "center",

    // shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // shadow (Android)
    elevation: 4
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 50
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center"
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222"
  },

  meta: {
    color: "#777",
    marginTop: 2,
    fontSize: 13
  },

  profession: {
    marginTop: 4,
    fontSize: 14,
    color: "#444"
  },

  button: {
    marginTop: 8,
    backgroundColor: "#E94057",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start"
  },

  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600"
  }

});