import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";

type Props = {
  onLogin: () => void;
  onRegister: () => void;
};

export default function LoginScreen({ onLogin, onRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Validation
  const emailValid = email.includes("@cvsu.edu.ph");
  const passwordValid = password.length >= 8;
  const formValid = emailValid && passwordValid;

  const handleLogin = () => {
    setSubmitted(true);
    if (!formValid) return;
    onLogin();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/Logo_Name.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to UniNotes</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* Input Card */}
      <View style={styles.inputCard}>
        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#8A8A8A"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#8A8A8A"
          />
        </View>
      </View>

      {/* Login Button */}
      <Pressable
        onPress={handleLogin}
        disabled={!formValid}
        style={({ pressed }) => [
          styles.loginButton,
          (!formValid || pressed) && styles.loginButtonActive,
          !formValid && styles.loginButtonDisabled,
        ]}
      >
        <Text style={styles.loginText}>Login</Text>
      </Pressable>

      {/* Register Text */}
      <Pressable onPress={onRegister}>
        {({ pressed }) => (
          <Text
            style={[styles.registerText, pressed && styles.registerTextActive]}
          >
            Don’t have an account? Register
          </Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center", 
  },

  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },

  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    width: 400, 
    height: 300, 
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },

  inputGroup: {
    marginBottom: 16,
  },

  inputLabel: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#444",
  },

  input: {
    backgroundColor: "#F3F8FE",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D6E6F5",
  },

  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: "#E74C3C",
    fontWeight: "600",
  },

  loginButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 16,
    borderRadius: 14,
    width: 400, 
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#2D9CDB",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },

  loginButtonActive: {
    backgroundColor: "#1B7FC1",
    transform: [{ scale: 0.98 }],
  },

  loginButtonDisabled: {
    backgroundColor: "#9CCAF0",
    shadowOpacity: 0,
  },

  loginText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  registerText: {
    color: "#2D9CDB",
    fontWeight: "600",
    fontSize: 14,
  },

  registerTextActive: {
    color: "#1B7FC1",
    textDecorationLine: "underline",
  },
});

