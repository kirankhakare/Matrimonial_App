import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/header/Header";

export default function PaymentReportsPage() {
  return (
    <View style={styles.container}>
      <Header title="Payment Reports" showBack={true} showProfile={false} />

      <View style={styles.center}>
        <Text style={styles.title}>Payment Reports</Text>
        <Text style={styles.sub}>
          Payment reports and premium transaction data will appear here.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F2",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#7A1120",
  },
  sub: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
    textAlign: "center",
  },
});