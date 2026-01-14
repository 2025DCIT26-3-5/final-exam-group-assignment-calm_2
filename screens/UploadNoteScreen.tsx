import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

type Note = { id: number; title: string; content: string; rating: number };

type Props = {
  notes: Note[];
  onSave: (notes: Note[]) => void;
  onBack: () => void;
  onLogout?: () => void; // optional logout prop
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
    <View style={styles.container}>
      {/* Avatar Icon */}
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

      {/* Conditional Logout Button */}
      {showLogout && onLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>Upload Note</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBack} onPress={onBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f8ff" },
  avatarContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  logoutButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 8,
    position: "absolute",
    top: 70,
    right: 20,
    zIndex: 9,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 60, // space below avatar
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonBack: { backgroundColor: "#007BFF", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
