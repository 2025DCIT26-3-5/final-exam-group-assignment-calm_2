import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  notes: any[];
  onUpload: () => void;
  onOpenNote: (note: any) => void;
};

export default function NotesListScreen({
  notes,
  onUpload,
  onOpenNote,
}: Props) {
  // sort by rating descending
  const sortedNotes = [...notes].sort((a, b) => b.rating - a.rating);

  return (
    <View style={styles.container}>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
