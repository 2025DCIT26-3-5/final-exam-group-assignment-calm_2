import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  note: any;
  onBack: () => void;
  notes: any[];
  onRate: () => void;
};

export default function NoteDetailScreen({
  note,
  onBack,
  notes,
  onRate,
}: Props) {
  const rate = async (delta: number) => {
    try {
      await fetch(`http://localhost:3000/notes/${note.id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta }),
      });
      onRate();
    } catch (err) {
      console.error("Failed to rate note:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
      <Text style={styles.rating}>Rating: {note.rating}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => rate(1)}>
          <Text style={styles.buttonText}>Upvote</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => rate(-1)}>
          <Text style={styles.buttonText}>Downvote</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f8ff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  content: { fontSize: 16, marginBottom: 10 },
  rating: { fontSize: 16, fontWeight: "bold", marginBottom: 20 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  backButton: { backgroundColor: "#007BFF", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
