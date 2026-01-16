import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

type Props = {
  onBack: () => void;
  userEmail: string; // Pass the logged-in user's email
};

export default function SettingScreen({ onBack, userEmail }: Props) {
  const [showProfile, setShowProfile] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  // Profile Information
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email] = useState(userEmail); // read-only, from logged-in user

  // Password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handlers
  const handleSaveProfile = () => {
    if (!name || !username) {
      Alert.alert("Error", "Name and username cannot be empty.");
      return;
    }
    Alert.alert("Success", "Profile information updated!");
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    Alert.alert("Success", "Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Settings</Text>

      {/* ----------------- Profile Information ----------------- */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setShowProfile(!showProfile)}
      >
        <Text style={styles.sectionButtonText}>Profile Information</Text>
        <Text style={styles.sectionButtonText}>{showProfile ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {showProfile && (
        <View style={styles.sectionContent}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: "#E0E0E0" }]}
            value={email}
            editable={false} // read-only
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveText}>Save Profile</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ----------------- Manage Account ----------------- */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => setShowAccount(!showAccount)}
      >
        <Text style={styles.sectionButtonText}>Manage Account</Text>
        <Text style={styles.sectionButtonText}>{showAccount ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {showAccount && (
        <View style={styles.sectionContent}>
          <Text style={styles.label}>Change Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
            <Text style={styles.saveText}>Save Password</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF4FF", padding: 20 },
  backButton: { marginBottom: 20 },
  backText: { fontSize: 16, color: "#2D9CDB" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  sectionButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 2,
  },
  sectionButtonText: { fontSize: 16, fontWeight: "600", color: "#333" },
  sectionContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 2,
  },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8, color: "#555" },
  input: {
    backgroundColor: "#F5F7FA",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6E6F5",
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#2D9CDB",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
