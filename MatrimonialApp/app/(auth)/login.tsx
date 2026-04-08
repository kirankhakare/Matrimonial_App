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
import { loginUser } from "../../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import API from "../../services/api";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

const handleLogin = async () => {
  if (!form.email || !form.password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await loginUser(form);

    const token = res.data.token;
    const user = res.data.user;

    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    // 🔍 Check if biodata exists
    try {
      const biodataRes = await API.get("/biodata/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (biodataRes.data) {
        alert("Login Successful ✅");
        router.replace("/(tabs)");
      } else {
        router.replace("/create-biodata");
      }
    } catch (biodataError: any) {
      if (biodataError.response?.status === 404) {
        alert("Please complete your biodata first 📝");
        router.replace("/create-biodata");
      } else {
        console.log("Biodata check error:", biodataError);
        alert("Something went wrong while checking biodata");
      }
    }
  } catch (error) {
    alert("Invalid Email or Password ❌");
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
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Logo Section */}
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/images/icon.png")} // ⚠️ path change if needed
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your journey towards a beautiful match
          </Text>

          {/* Form Card */}
          <View style={styles.formCard}>
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
              placeholder="Enter your password"
              placeholderTextColor="#9A8E84"
              secureTextEntry
              style={styles.input}
              onChangeText={(text) => setForm({ ...form, password: text })}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerLink} onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.linkText}>
                Don’t have an account? <Text style={styles.linkBold}>Register</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Text */}
          <Text style={styles.bottomText}>
            Trusted matrimonial platform for meaningful connections 💍
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
    width: 190,
    height: 190,
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

  registerLink: {
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