import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

type Note = { id: number; title: string; content: string; rating: number };

type Props = {
  note: Note;
  onBack: () => void;
  onRate: (notes: Note[]) => void;
  notes: Note[];
  onLogout?: () => void;
};

export default function NoteDetailScreen({
  note,
  onBack,
  onRate,
  notes,
  onLogout,
}: Props) {
  const [showLogout, setShowLogout] = useState(false);

  const upvote = () => {
    const updatedNotes = notes.map((n) =>
      n.id === note.id ? { ...n, rating: n.rating + 1 } : n
    );
    onRate(updatedNotes);
  };

  const downvote = () => {
    const updatedNotes = notes.map((n) =>
      n.id === note.id ? { ...n, rating: n.rating - 1 } : n
    );
    onRate(updatedNotes);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with avatar separated */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Note Detail</Text>
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
      </View>

      {/* Logout button */}
      {showLogout && onLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}

      {/* Note Sections with Borders */}
      <View style={styles.noteCard}>
        {/* Title Section */}
        <View style={styles.sectionBox}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.title}>{note.title}</Text>
        </View>

        {/* Content Section */}
        <View style={styles.sectionBox}>
          <Text style={styles.label}>Content</Text>
          <Text style={styles.content}>{note.content}</Text>
        </View>

        {/* Rating Section */}
        <View style={styles.sectionBox}>
          <Text style={styles.label}>Rating</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>{note.rating}</Text>
          </View>
        </View>

        {/* Upvote/Downvote Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={upvote}>
            <Text style={styles.buttonText}>Upvote</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={downvote}>
            <Text style={styles.buttonText}>Downvote</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0E68C",
    padding: 20,
  },

  // Header
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  avatarContainer: {},
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

  // Note Card
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },

  // Each Section
  sectionBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },

  label: {
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    fontSize: 16,
    color: "#333",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  // Buttons
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
