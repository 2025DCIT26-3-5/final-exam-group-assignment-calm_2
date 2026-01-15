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
import { useNotes, Note } from "../contexts/NotesContext";

type Props = {
  onBack: () => void;
  onLogout?: () => void;
};

export default function UploadNoteScreen({ onBack, onLogout }: Props) {
  const { addNote } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const saveNote = () => {
    if (!title || !content) return;
    addNote({ title, content, rating: 0 }); // Add note to context
    onBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upload Note</Text>

        {onLogout && (
          <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Logout */}
      {showLogout && onLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter note title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your note here..."
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, (!title || !content) && { opacity: 0.5 }]}
          onPress={saveNote}
          disabled={!title || !content}
        >
          <Text style={styles.buttonText}>Save Note</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FF",
    padding: 20,
  },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 420,
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  /* Logout */
  logoutButton: {
    position: "absolute",
    top: 80,
    right: 30,
    backgroundColor: "#E74C3C",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    zIndex: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* Card */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
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
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  /* Buttons */
  saveButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  backButton: {
    marginTop: 14,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  backText: {
    textAlign: "center",
    color: "#2D9CDB",
    fontWeight: "600",
  },
});
