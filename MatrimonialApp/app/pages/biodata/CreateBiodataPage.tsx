import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import {
  createBiodata,
  getMyBiodata,
  updateMyBiodata,
} from "../../../services/biodataService";

// ✅ ENV VARIABLES
const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_UPLOAD_PRESET;

export default function CreateBiodataPage() {
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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
    image: "",
  });

  useEffect(() => {
    fetchExistingBiodata();
  }, []);

  const fetchExistingBiodata = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const res = await getMyBiodata(token);

      if (res.data) {
        setForm({
          name: res.data.name || "",
          dob: res.data.dob || "",
          placeOfBirth: res.data.placeOfBirth || "",
          birthTime: res.data.birthTime || "",
          height: res.data.height || "",
          caste: res.data.caste || "",
          education: res.data.education || "",
          bloodGroup: res.data.bloodGroup || "",
          hobby: res.data.hobby || "",
          ras: res.data.ras || "",
          language: res.data.language || "",
          job: res.data.job || "",
          salary: res.data.salary || "",
          fatherName: res.data.fatherName || "",
          fatherIncome: res.data.fatherIncome || "",
          motherName: res.data.motherName || "",
          siblings: res.data.siblings || "",
          contactName: res.data.contactName || "",
          address: res.data.address || "",
          phone: res.data.phone || "",
          email: res.data.email || "",
          image: res.data.image || "",
        });

        setIsEditMode(true);
      }
    } catch (error) {
      console.log("No existing biodata found");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Please allow gallery access.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.8,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        uploadToCloudinary(imageUri);
      }
    } catch (error) {
      console.log("Image Picker Error:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

 const uploadToCloudinary = async (imageUri: string) => {
  try {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      Alert.alert(
        "Cloudinary Config Missing",
        "Please check your .env file for EXPO_PUBLIC_CLOUD_NAME and EXPO_PUBLIC_UPLOAD_PRESET"
      );
      return;
    }

    setUploadingImage(true);

    const formData = new FormData();

    // IMPORTANT: For Expo / React Native
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: `profile_${Date.now()}.jpg`,
    } as any);

    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "matrimony_profiles");

    console.log("Uploading to Cloudinary...");
    console.log("CLOUD_NAME:", CLOUD_NAME);
    console.log("UPLOAD_PRESET:", UPLOAD_PRESET);
    console.log("IMAGE_URI:", imageUri);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    console.log("Cloudinary Response:", result);

    if (response.ok && result.secure_url) {
      setForm((prev) => ({
        ...prev,
        image: result.secure_url,
      }));

      Alert.alert("Success", "Image uploaded successfully ✅");
    } else {
      Alert.alert(
        "Upload Failed",
        result?.error?.message || "Could not upload image"
      );
    }
  } catch (error) {
    console.log("Cloudinary Upload Error:", error);
    Alert.alert("Error", "Image upload failed");
  } finally {
    setUploadingImage(false);
  }
};

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      if (!form.name || !form.dob || !form.placeOfBirth || !form.phone) {
        Alert.alert("Validation", "Please fill required fields");
        return;
      }

      if (isEditMode) {
        await updateMyBiodata(form, token);
        Alert.alert("Success", "Biodata updated successfully ✅");
      } else {
        await createBiodata(form, token);
        Alert.alert("Success", "Biodata saved successfully ✅");
      }

      router.replace("/(tabs)/profile");
    } catch (error: any) {
      console.log(
        "Submit Biodata Error:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to save biodata");
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7A1120" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#FFF8F2", "#FFFFFF", "#FFF9F4"]}
      style={styles.gradient}
    >
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>
          {isEditMode ? "Edit Your Biodata" : "Complete Your Biodata"}
        </Text>
        <Text style={styles.subtitle}>
          Add your photo and details to make your profile attractive
        </Text>

        {/* PROFILE IMAGE */}
        <View style={styles.imageSection}>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {form.image ? (
              <Image source={{ uri: form.image }} style={styles.previewImage} />
            ) : (
              <Text style={styles.imageText}>Upload Profile Photo</Text>
            )}
          </TouchableOpacity>

          {uploadingImage && (
            <ActivityIndicator
              size="small"
              color="#7A1120"
              style={{ marginTop: 10 }}
            />
          )}
        </View>

        {/* PERSONAL DETAILS */}
        <SectionTitle title="Personal Details" />
        <Input
          label="Full Name"
          value={form.name}
          onChangeText={(v) => handleChange("name", v)}
        />
        <Input
          label="Date of Birth (DD/MM/YYYY)"
          value={form.dob}
          onChangeText={(v) => handleChange("dob", v)}
        />
        <Input
          label="Place of Birth"
          value={form.placeOfBirth}
          onChangeText={(v) => handleChange("placeOfBirth", v)}
        />
        <Input
          label="Birth Time"
          value={form.birthTime}
          onChangeText={(v) => handleChange("birthTime", v)}
        />
        <Input
          label="Height"
          value={form.height}
          onChangeText={(v) => handleChange("height", v)}
        />
        <Input
          label="Caste"
          value={form.caste}
          onChangeText={(v) => handleChange("caste", v)}
        />
        <Input
          label="Blood Group"
          value={form.bloodGroup}
          onChangeText={(v) => handleChange("bloodGroup", v)}
        />
        <Input
          label="Language"
          value={form.language}
          onChangeText={(v) => handleChange("language", v)}
        />
        <Input
          label="Hobby"
          value={form.hobby}
          onChangeText={(v) => handleChange("hobby", v)}
        />
        <Input
          label="Rashi"
          value={form.ras}
          onChangeText={(v) => handleChange("ras", v)}
        />

        {/* EDUCATION / CAREER */}
        <SectionTitle title="Education & Career" />
        <Input
          label="Education"
          value={form.education}
          onChangeText={(v) => handleChange("education", v)}
        />
        <Input
          label="Job / Profession"
          value={form.job}
          onChangeText={(v) => handleChange("job", v)}
        />
        <Input
          label="Salary"
          value={form.salary}
          onChangeText={(v) => handleChange("salary", v)}
        />

        {/* FAMILY DETAILS */}
        <SectionTitle title="Family Details" />
        <Input
          label="Father Name"
          value={form.fatherName}
          onChangeText={(v) => handleChange("fatherName", v)}
        />
        <Input
          label="Father Income"
          value={form.fatherIncome}
          onChangeText={(v) => handleChange("fatherIncome", v)}
        />
        <Input
          label="Mother Name"
          value={form.motherName}
          onChangeText={(v) => handleChange("motherName", v)}
        />
        <Input
          label="Brother / Sister Name"
          value={form.siblings}
          onChangeText={(v) => handleChange("siblings", v)}
        />

        {/* CONTACT DETAILS */}
        <SectionTitle title="Contact Details" />
        <Input
          label="Contact Person Name"
          value={form.contactName}
          onChangeText={(v) => handleChange("contactName", v)}
        />
        <Input
          label="Address"
          value={form.address}
          onChangeText={(v) => handleChange("address", v)}
        />
        <Input
          label="Phone Number"
          value={form.phone}
          onChangeText={(v) => handleChange("phone", v)}
          keyboardType="phone-pad"
        />
        <Input
          label="Email ID"
          value={form.email}
          onChangeText={(v) => handleChange("email", v)}
          keyboardType="email-address"
        />

        {/* SUBMIT */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isEditMode ? "Update Biodata" : "Save Biodata"}
          </Text>
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

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8F2",
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

  imageSection: {
    alignItems: "center",
    marginBottom: 24,
  },

  imagePicker: {
    width: 130,
    height: 160,
    borderRadius: 20,
    backgroundColor: "#F9F3EB",
    borderWidth: 1,
    borderColor: "#E4D6C3",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  previewImage: {
    width: "100%",
    height: "100%",
  },

  imageText: {
    color: "#7A1120",
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 12,
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