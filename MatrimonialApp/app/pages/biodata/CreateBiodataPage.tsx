import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { createBiodata } from "../../../services/biodataService";
export default function CreateBiodataPage() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    placeOfBirth: "",
    birthTime: "",
    height: "",
    caste: "",
    education: "",
    bloodGroup: "",
    hobby: "",
    ras: "",
    language: "",
    job: "",
    salary: "",
    fatherName: "",
    fatherIncome: "",
    motherName: "",
    siblings: "",
    contactName: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

 const handleSubmit = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    await createBiodata(form, token);

    Alert.alert("Success", "Biodata saved successfully ✅");
    router.replace("/(tabs)");
  } catch (error: any) {
    console.log("Create Biodata Error:", error.response?.data || error.message);
    Alert.alert("Error", "Failed to save biodata");
  }
};

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.gradient}
    >
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={styles.title}>Complete Your Biodata</Text>
        <Text style={styles.subtitle}>
          Fill in your profile details to continue using the app
        </Text>

        {/* PERSONAL DETAILS */}
        <SectionTitle title="Personal Details" />
        <Input label="Full Name" value={form.name} onChangeText={(v) => handleChange("name", v)} />
        <Input label="Date of Birth" value={form.dob} onChangeText={(v) => handleChange("dob", v)} />
        <Input label="Place of Birth" value={form.placeOfBirth} onChangeText={(v) => handleChange("placeOfBirth", v)} />
        <Input label="Birth Time" value={form.birthTime} onChangeText={(v) => handleChange("birthTime", v)} />
        <Input label="Height" value={form.height} onChangeText={(v) => handleChange("height", v)} />
        <Input label="Caste" value={form.caste} onChangeText={(v) => handleChange("caste", v)} />
        <Input label="Blood Group" value={form.bloodGroup} onChangeText={(v) => handleChange("bloodGroup", v)} />
        <Input label="Language" value={form.language} onChangeText={(v) => handleChange("language", v)} />
        <Input label="Hobby" value={form.hobby} onChangeText={(v) => handleChange("hobby", v)} />
        <Input label="Rashi" value={form.ras} onChangeText={(v) => handleChange("ras", v)} />

        {/* EDUCATION / CAREER */}
        <SectionTitle title="Education & Career" />
        <Input label="Education" value={form.education} onChangeText={(v) => handleChange("education", v)} />
        <Input label="Job / Profession" value={form.job} onChangeText={(v) => handleChange("job", v)} />
        <Input label="Salary" value={form.salary} onChangeText={(v) => handleChange("salary", v)} />

        {/* FAMILY DETAILS */}
        <SectionTitle title="Family Details" />
        <Input label="Father Name" value={form.fatherName} onChangeText={(v) => handleChange("fatherName", v)} />
        <Input label="Father Income" value={form.fatherIncome} onChangeText={(v) => handleChange("fatherIncome", v)} />
        <Input label="Mother Name" value={form.motherName} onChangeText={(v) => handleChange("motherName", v)} />
        <Input label="Brother / Sister Name" value={form.siblings} onChangeText={(v) => handleChange("siblings", v)} />

        {/* CONTACT DETAILS */}
        <SectionTitle title="Contact Details" />
        <Input label="Contact Person Name" value={form.contactName} onChangeText={(v) => handleChange("contactName", v)} />
        <Input label="Address" value={form.address} onChangeText={(v) => handleChange("address", v)} />
        <Input label="Phone Number" value={form.phone} onChangeText={(v) => handleChange("phone", v)} keyboardType="phone-pad" />
        <Input label="Email ID" value={form.email} onChangeText={(v) => handleChange("email", v)} keyboardType="email-address" />

        {/* SUBMIT */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Biodata</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function Input({
  label,
  value,
  onChangeText,
  keyboardType = "default",
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={`Enter ${label}`}
        placeholderTextColor="#9A8E84"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#7A1120",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B5B4F",
    textAlign: "center",
    marginBottom: 26,
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#7A1120",
    marginBottom: 14,
    marginTop: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5B4036",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#F9F3EB",
    borderWidth: 1,
    borderColor: "#E4D6C3",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#3A2A22",
  },

  button: {
    backgroundColor: "#7A0F1E",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 28,
    shadowColor: "#7A0F1E",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  buttonText: {
    color: "#F8F3EA",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});