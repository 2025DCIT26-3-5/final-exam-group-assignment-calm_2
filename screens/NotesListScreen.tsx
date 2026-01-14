import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

type Note = { id: number; title: string; content: string; rating: number };

type Props = {
  notes: Note[];
  onUpload: () => void;
  onOpenNote: (note: Note) => void;
  onLogout: () => void;
};

export default function NotesListScreen({
  notes,
  onUpload,
  onOpenNote,
  onLogout,
}: Props) {
  const [showLogout, setShowLogout] = useState(false);
  const sortedNotes = [...notes].sort((a, b) => b.rating - a.rating);

  return (
    <View style={styles.container}>
      {/* Avatar Icon */}
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

      {/* Conditional Logout Button */}
      {showLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>Lecture Notes</Text>
      <FlatList
        data={sortedNotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.note}
            onPress={() => onOpenNote(item)}
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text>Rating: {item.rating}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={onUpload}>
        <Text style={styles.buttonText}>Upload Note</Text>
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
  note: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
  noteTitle: { fontWeight: "bold", marginBottom: 5 },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});