import { FlatList, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import BiodataCard from "./BiodataCard";

type Biodata = {
  _id?: string;
  id?: number | string;
  name: string;
  age?: number;
  dob?: string;
  city?: string;
  placeOfBirth?: string;
  profession?: string;
  job?: string;
  image?: string | any;
  height?: string;
  caste?: string;
  subcast?: string;
  isPremium?: boolean;
  isVerified?: boolean;
};

type Props = {
  data: Biodata[];
  loading?: boolean;
  isSubscribed?: boolean;
  onView?: (item: Biodata) => void;
};

export default function BiodataList({
  data,
  loading,
  isSubscribed = false,
  onView,
}: Props) {
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
      keyExtractor={(item, index) =>
        item._id?.toString() || item.id?.toString() || index.toString()
      }
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <BiodataCard
            data={item}
            isSubscribed={isSubscribed}
            onView={() => onView?.(item)}
          />
        </View>
      )}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}

      // ⚡ Performance
      initialNumToRender={6}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 40,
  },

  cardWrapper: {
    marginBottom: 14,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 20,
  },

  loadingText: {
    marginTop: 10,
    color: "#7A1120",
    fontSize: 14,
    fontWeight: "600",
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#7A1120",
  },

  emptySub: {
    fontSize: 13,
    color: "#777",
    marginTop: 6,
    textAlign: "center",
  },
});