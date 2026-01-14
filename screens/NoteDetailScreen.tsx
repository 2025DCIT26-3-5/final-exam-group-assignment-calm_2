import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { createNote } from '../services/api';

export default function AddNoteScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [professor, setProfessor] = useState('');
  const [content, setContent] = useState('');

<<<<<<< HEAD
  const submit = async () => {
    await createNote({
      title,
      professor,
      content,
      rating: 0,
    });

    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Lecture Title" onChangeText={setTitle} />
      <TextInput placeholder="Professor" onChangeText={setProfessor} />
      <TextInput
        placeholder="Notes"
        multiline
        style={{ height: 120 }}
        onChangeText={setContent}
      />
      <Button title="Upload Anonymously" onPress={submit} />
    </View>
  );
}
=======
type Props = {
  note: Note;
  onBack: () => void;
  onRate: (notes: Note[]) => void;
  notes: Note[];
  onLogout?: () => void; // optional logout prop
};

export default function NoteDetailScreen({
  note,
  onBack,
  onRate,
  notes,
  onLogout,
}: Props) {
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
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
      <Text style={styles.rating}>Rating: {note.rating}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={upvote}>
          <Text style={styles.buttonText}>Upvote</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={downvote}>
          <Text style={styles.buttonText}>Downvote</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      {/* Optional Logout Button */}
      {onLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}
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
  logoutButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
>>>>>>> 7c407d94c32b9753bc6faf6ea225e8bd121b43d8
