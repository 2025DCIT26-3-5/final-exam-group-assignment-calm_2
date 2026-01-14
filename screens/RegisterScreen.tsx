import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

type Props = {
  onBack: () => void;
  onRegister?: (email: string, password: string) => void;
};

export default function RegisterScreen({ onBack, onRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleRegister = () => {
    if (onRegister && email && passwordsMatch) {
      onRegister(email, password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/Logo_Name.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
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

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#8A8A8A"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Re-enter password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#8A8A8A"
          />

          {confirmPassword.length > 0 && (
            <Text
              style={[
                styles.matchText,
                { color: passwordsMatch ? "#2ecc71" : "#e74c3c" },
              ]}
            >
              {passwordsMatch ? "Passwords match ✓" : "Passwords do not match"}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.registerButton, !passwordsMatch && { opacity: 0.5 }]}
          onPress={handleRegister}
          disabled={!passwordsMatch}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 420,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1A1A1A",
  },

  inputGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#F9FBFD",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D6E6F5",
  },

  matchText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
  },

  registerButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  loginText: {
    marginTop: 16,
    textAlign: "center",
    color: "#2D9CDB",
    fontWeight: "600",
  },
});
