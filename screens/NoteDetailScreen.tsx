import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from "react-native";
import { useNotes, Note } from "../contexts/NotesContext";

type Props = {
  note: Note;
  onBack: () => void;
  onLogout?: () => void;
};

export default function NoteDetailScreen({ note, onBack, onLogout }: Props) {
  const { notes, addRating } = useNotes();
  const [currentNote, setCurrentNote] = useState<Note>(note);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const found = notes.find((n) => n._id === note._id);
    if (found) setCurrentNote(found);
  }, [notes, note._id]);

  const averageRating = currentNote.ratings.length
    ? currentNote.ratings.reduce((a, b) => a + b, 0) / currentNote.ratings.length
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Note Details</Text>

        {onLogout && (
          <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }} style={styles.avatar} />
          </TouchableOpacity>
        )}
      </View>

      {showLogout && onLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}

      <View style={styles.card}>
        <Text style={styles.noteTitle}>{currentNote.title}</Text>
        <Text style={styles.noteContent}>{currentNote.content}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.avgText}>⭐ Average: {averageRating.toFixed(1)}</Text>
          <View style={styles.buttonsRow}>
            {[1, 2, 3, 4, 5].map((r) => (
              <TouchableOpacity key={r} style={styles.ratingButton} onPress={() => addRating(currentNote._id, r)}>
                <Text style={styles.ratingText}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles same as before
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAF4FF", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  logoutButton: { position: "absolute", top: 80, right: 30, backgroundColor: "#E74C3C", padding: 10, borderRadius: 10 },
  logoutText: { color: "#fff", fontWeight: "bold" },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 20, shadowColor: "#000", shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10, elevation: 5 },
  noteTitle: { fontSize: 18, fontWeight: "700", color: "#1A1A1A", marginBottom: 12 },
  noteContent: { fontSize: 15, color: "#555", marginBottom: 20 },
  ratingContainer: { marginBottom: 20 },
  avgText: { fontSize: 14, fontWeight: "600", marginBottom: 10 },
  buttonsRow: { flexDirection: "row", justifyContent: "space-between", maxWidth: 250 },
  ratingButton: { backgroundColor: "#2D9CDB", width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  ratingText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  backButton: { marginTop: 10 },
  backText: { textAlign: "center", color: "#2D9CDB", fontWeight: "600" },
});
