import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { registerUser } from "../../services/authService";
import { router } from "expo-router";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await registerUser(form);
      alert("Registered Successfully ✅");
      router.replace("/(auth)/login");
    } catch (error) {
      alert("Registration Failed ❌");
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F3EA" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/images/icon.png")} // ⚠️ path check kar
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>
            Begin your journey to find a beautiful and meaningful match
          </Text>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#9A8E84"
              style={styles.input}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#9A8E84"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setForm({ ...form, email: text })}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Create a password"
              placeholderTextColor="#9A8E84"
              secureTextEntry
              style={styles.input}
              onChangeText={(text) => setForm({ ...form, password: text })}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={styles.linkText}>
                Already have an account? <Text style={styles.linkBold}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Text */}
          <Text style={styles.bottomText}>
            सुरक्षित, विश्वासार्ह आणि सुंदर नात्यांसाठी तुमचा साथीदार 💍
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F3EA",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  logoWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#7A0F1E",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B5B4F",
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
    paddingHorizontal: 8,
  },

  formCard: {
    backgroundColor: "#FFFDF9",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E7D9C7",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5B4036",
    marginBottom: 8,
    marginTop: 4,
  },

  input: {
    backgroundColor: "#F9F3EB",
    borderWidth: 1,
    borderColor: "#E4D6C3",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#3A2A22",
    marginBottom: 14,
  },

  button: {
    backgroundColor: "#7A0F1E",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
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

  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },

  linkText: {
    color: "#6B5B4F",
    fontSize: 14,
  },

  linkBold: {
    color: "#C9A14A",
    fontWeight: "700",
  },

  bottomText: {
    textAlign: "center",
    marginTop: 28,
    color: "#8C7768",
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});