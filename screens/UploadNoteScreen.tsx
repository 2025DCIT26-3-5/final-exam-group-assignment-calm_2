import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

type Note = { id: number; title: string; content: string; rating: number };

type Props = {
  notes: Note[];
  onSave: (notes: Note[]) => void;
  onBack: () => void;
  onLogout?: () => void;
};

export default function UploadNoteScreen({
  notes,
  onSave,
  onBack,
  onLogout,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const saveNote = () => {
    if (!title || !content) return;
    const newNote = { id: Date.now(), title, content, rating: 0 };
    onSave([...notes, newNote]);
    onBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Avatar */}
      {onLogout && (
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => setShowLogout(!showLogout)}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      )}

      {/* Logout */}
      {showLogout && onLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>Upload Note</Text>

      {/* Input Form */}
      <View style={styles.inputCard}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={[styles.inputGroup, { marginTop: 15 }]}>
          <Text style={styles.inputLabel}>Content</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0E68C", // khaki
    padding: 20,
  },
  avatarContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  logoutButton: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
    marginBottom: 20,
  },

  // Input Card
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 10,
  },
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

  // Buttons
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
