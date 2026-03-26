import { FlatList, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import BiodataCard from "./BiodataCard";

type Biodata = {
  id: number;
  name: string;
  age: number;
  city: string;
  profession: string;
};

type Props = {
  data: Biodata[];
  loading?: boolean;
};

export default function BiodataList({ data, loading }: Props) {

  // 🔄 Loading State
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E94057" />
        <Text style={styles.loadingText}>Loading profiles...</Text>
      </View>
    );
  }

  // 📭 Empty State
  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No profiles found 😔</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <BiodataCard data={item} />}
      
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}

      // ⚡ Performance
      initialNumToRender={6}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 20
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },

  loadingText: {
    marginTop: 10,
    color: "#666"
  },

  emptyText: {
    fontSize: 16,
    color: "#999"
  }

});