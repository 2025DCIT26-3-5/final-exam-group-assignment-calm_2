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
      <View style={styles.logoSpacer} />

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

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {/* Password Match Indicator */}
          {confirmPassword.length > 0 && (
            <Text
              style={[
                styles.matchText,
                { color: passwordsMatch ? "#28a745" : "#dc3545" },
              ]}
            >
              {passwordsMatch ? "Passwords matched ✓" : "Passwords do not match"}
            </Text>
          )}
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={[
          styles.registerButton,
          !passwordsMatch && { opacity: 0.6 },
        ]}
        onPress={handleRegister}
        disabled={!passwordsMatch}
      >
        <Text style={styles.buttonText}>Register Account!</Text>
      </TouchableOpacity>

      {/* Back to Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={onBack}>
        <Text style={styles.buttonText}>Already have an Account? Login here!
        </Text>
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
    marginBottom: 50,
    position: "absolute",
    top: -75,
  },

  title: {
    marginTop: 250,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },

  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 13,
    width: "90%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },

  inputGroup: {
    marginBottom: 15,
  },

  inputLabel: {
    fontWeight: "600",
    color: "#555",
  },

  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  matchText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
  },

  registerButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    width: "90%",
    marginBottom: 10,
  },

  loginButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    width: "90%",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  logoSpacer: {
    height: 250, 
  },

});
