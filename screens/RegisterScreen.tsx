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
import { useAuth } from "../contexts/AuthContext"; // AuthContext

type Props = {
  onBack: () => void;
  onRegister?: () => void; // we’ll handle navigation internally
};

export default function RegisterScreen({ onBack }: Props) {
  const { login } = useAuth(); // set userId after registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const emailValid = email.includes("@cvsu.edu.ph");
  const passwordValid = password.length >= 8;
  const formValid = passwordsMatch && emailValid && passwordValid;

  const handleRegister = async () => {
    setSubmitted(true);
    setErrorMessage("");

    if (!formValid) return;

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Registration failed");
      }

      const data = await res.json(); // expect { userId: string }
      login(data.userId); // save userId in AuthContext
      // After registration, automatically navigate to NotesListScreen
    } catch (err: any) {
      console.error("Registration error:", err);
      setErrorMessage(err.message || "Registration failed");
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
          {submitted && !emailValid && (
            <Text style={styles.errorText}>Email must contain @cvsu.edu.ph</Text>
          )}
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
          {submitted && !passwordValid && (
            <Text style={styles.errorText}>
              Password must be at least 8 characters
            </Text>
          )}
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
          {submitted && !passwordsMatch && (
            <Text style={styles.errorText}>Passwords do not match</Text>
          )}
        </View>

        {/* Backend error */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity
          style={[styles.registerButton, !formValid && { opacity: 0.5 }]}
          onPress={handleRegister}
          disabled={!formValid}
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

// Keep your styles as is, just add errorText if missing
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF4FF", alignItems: "center", justifyContent: "center", padding: 20 },
  logo: { width: 180, height: 180, marginBottom: 20 },
  card: { backgroundColor: "#fff", width: "100%", maxWidth: 420, borderRadius: 16, padding: 20, shadowColor: "#000", shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10, elevation: 5, marginTop: -20 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#1A1A1A" },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: "600", color: "#555", marginBottom: 6 },
  input: { backgroundColor: "#F9FBFD", borderRadius: 10, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: "#D6E6F5" },
  registerButton: { backgroundColor: "#28a745", padding: 15, borderRadius: 8, width: "90%", marginBottom: 7 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
  loginText: { marginTop: 16, textAlign: "center", color: "#2D9CDB", fontWeight: "600" },
  errorText: { color: "#E74C3C", fontSize: 12, fontWeight: "600", marginTop: 4 },
});
