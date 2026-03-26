import { FlatList, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import BiodataCard from "./BiodataCard";

type Biodata = {
  id: number;
  name: string;
  age: number;
  city: string;
  profession: string;
  image?: string;
  isPremium?: boolean;
  isVerified?: boolean;
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
        <ActivityIndicator size="large" color="#7A1120" />
        <Text style={styles.loadingText}>Loading profiles...</Text>
      </View>
    );
  }

  // 📭 Empty State
  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>No Profiles Found 😔</Text>
        <Text style={styles.emptySub}>
          Try adjusting your search or filters
        </Text>
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
    paddingTop: 10,
    paddingBottom: 30
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 20
  },

  loadingText: {
    marginTop: 10,
    color: "#7A1120",
    fontSize: 14,
    fontWeight: "600"
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#7A1120"
  },

  emptySub: {
    fontSize: 13,
    color: "#777",
    marginTop: 6,
    textAlign: "center"
  }

});