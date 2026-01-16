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
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onLogin: (email: string) => void;
  onRegister: () => void;
};

export default function LoginScreen({ onLogin, onRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailValid = email.includes("@cvsu.edu.ph");
  const passwordValid = password.length >= 8;
  const formValid = emailValid && passwordValid;

  const handleLogin = () => {
    setSubmitted(true);
    if (!formValid) return;
    onLogin(email);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/Logo_Name.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to UniNotes</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

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

          {submitted && !email && (
            <Text style={styles.errorText}>Email is required</Text>
          )}

          {submitted && email && !emailValid && (
            <Text style={styles.errorText}>Use your @cvsu.edu.ph email</Text>
          )}
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#8A8A8A"
            />

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#444"
              />
            </Pressable>
          </View>

          {submitted && !password && (
            <Text style={styles.errorText}>Password is required</Text>
          )}

          {submitted && password && password.length < 8 && (
            <Text style={styles.errorText}>
              Password must be at least 8 characters
            </Text>
          )}
        </View>
      </View>

      {/* Login Button */}
      <Pressable
        onPress={handleLogin}
        style={({ pressed }) => [
          styles.loginButton,
          pressed && styles.loginButtonActive,
          !formValid && styles.loginButtonDisabled,
        ]}
      >
        <Text style={styles.loginText}>Login</Text>
      </Pressable>

      <Pressable onPress={onRegister}>
        {({ pressed }) => (
          <Text style={[styles.registerText, pressed && styles.registerTextActive]}>
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
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    padding: 40,
  },
  logo: {
    width: "90%",
    aspectRatio: 1,
    height: 200,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    width: "90%",
    maxWidth: 300,
    marginBottom: 20,
    elevation: 5,
    alignItems: "flex-start",
  },
  inputGroup: {
    width: "100%",
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
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F8FE",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D6E6F5",
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 8,
  },
  errorText: {
    marginTop: 6,
    color: "#D32F2F",
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 16,
    borderRadius: 14,
    width: "90%",
    maxWidth: 400,
    marginBottom: 12,
    alignItems: "center",
  },
  loginButtonActive: {
    backgroundColor: "#1B7FC1",
    transform: [{ scale: 0.98 }],
  },
  loginButtonDisabled: {
    backgroundColor: "#9CCAF0",
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
    textAlign: "center",
  },
  registerTextActive: {
    color: "#1B7FC1",
    textDecorationLine: "underline",
  },
});
