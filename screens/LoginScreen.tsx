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
  onLogin: () => void;
  onRegister: () => void;
};

export default function LoginScreen({ onLogin, onRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/Logo_Name.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Login</Text>

      {/* Input Card */}
      <View style={styles.inputCard}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0E68C",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 450,
    height: 450,
    maxWidth: 500,
    maxHeight: 500,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "white",
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  inputGroup: { marginBottom: 15 },
  inputLabel: {
    fontWeight: "600",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  loginButton: {
    backgroundColor: "#28a745", // green
    padding: 15,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#007BFF", // blue
    padding: 15,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
