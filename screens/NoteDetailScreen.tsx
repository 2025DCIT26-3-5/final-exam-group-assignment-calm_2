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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Note Detail</Text>

        {onLogout && (
          <TouchableOpacity
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

      {/* Logout */}
      {showLogout && onLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}

      {/* Note Card */}
      <View style={styles.noteCard}>
        <View style={styles.sectionBox}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.title}>{note.title}</Text>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.label}>Content</Text>
          <Text style={styles.content}>{note.content}</Text>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.label}>Rating</Text>
          <Text style={styles.rating}>{note.rating}</Text>
        </View>

        {/* Vote Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.upvote]}
            onPress={upvote}
          >
            <Text style={styles.buttonText}>Upvote</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.downvote]}
            onPress={downvote}
          >
            <Text style={styles.buttonText}>Downvote</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Back */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FF", // same as login
    alignItems: "center",
    padding: 20,
  },

  /* Header */
  header: {
    width: "100%",
    maxWidth: 420,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
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

  logoutButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    position: "absolute",
    top: 70,
    right: 20,
    zIndex: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* Card */
  noteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    width: "90%",
    maxWidth: 420,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },

  sectionBox: {
    backgroundColor: "#F3F8FE",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D6E6F5",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
  },

  content: {
    fontSize: 16,
    color: "#333",
  },

  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D9CDB",
  },

  /* Buttons */
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
  },

  upvote: {
    backgroundColor: "#2ECC71",
  },

  downvote: {
    backgroundColor: "#E67E22",
  },

  backButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 16,
    borderRadius: 14,
    width: "90%",
    maxWidth: 420,
    marginTop: 16,
    shadowColor: "#2D9CDB",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
