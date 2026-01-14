import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Note = { id: number; title: string; content: string; rating: number };

type Props = {
  notes: Note[];
  onSave: (notes: Note[]) => void;
  onBack: () => void;
};

export default function UploadNoteScreen({ notes, onSave, onBack }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const saveNote = () => {
    if (!title || !content) return;
    const newNote = { id: Date.now(), title, content, rating: 0 };
    onSave([...notes, newNote]);
    onBack();
  };

  return (
    <View style={styles.container}>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
