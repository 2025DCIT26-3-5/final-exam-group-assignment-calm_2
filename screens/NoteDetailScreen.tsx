import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView, // for scrolling
} from "react-native";
import { useNotes, Note } from "../contexts/NotesContext";

type Props = {
  note: Note;
  onBack: () => void;
};

export default function NoteDetailScreen({ note, onBack }: Props) {
  const { notes, updateNote } = useNotes();

  // Always get the latest version from context
  const currentNote = notes.find(n => n.id === note.id) || note;

  const averageRating =
    currentNote.ratings.length > 0
      ? currentNote.ratings.reduce((a, b) => a + b, 0) /
        currentNote.ratings.length
      : 0;

  const addRating = (value: number) => {
    const updatedNote: Note = {
      ...currentNote,
      ratings: [...currentNote.ratings, value],
      rating: value,
    };
    updateNote(updatedNote);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - fixed */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>UniNotes</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true} // show scrollbar on the side
        indicatorStyle="black" // iOS: make scrollbar dark
      >
        <View style={styles.card}>
          <Text style={styles.noteTitle}>{currentNote.title}</Text>
          <Text style={styles.noteContent}>{currentNote.content}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.avgText}>
              ⭐ Average: {averageRating.toFixed(1)}
            </Text>

            <View style={styles.buttonsRow}>
              {[1, 2, 3, 4, 5].map(r => (
                <TouchableOpacity
                  key={r}
                  style={styles.ratingButton}
                  onPress={() => addRating(r)}
                >
                  <Text style={styles.ratingText}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FF",
    paddingTop: 0,
  },

  /* ScrollView */
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 40, // extra spacing so last item isn't cut off
  },

  /* Header */
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    minWidth: 420,
    borderBottomColor: "#D6E6F5",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
  },

  /* Card */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: 400,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  noteContent: {
    fontSize: 15,
    color: "#555",
    marginBottom: 20,
  },

  ratingContainer: {
    marginBottom: 20,
  },
  avgText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
  },
  ratingButton: {
    backgroundColor: "#2D9CDB",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  backButton: {
    marginTop: 10,
    width: 400,
  },
  backText: {
    textAlign: "center",
    color: "#2D9CDB",
    fontWeight: "600",
  },
});
