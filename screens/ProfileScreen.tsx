import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNotes } from "../contexts/NotesContext";
import { Ionicons } from "@expo/vector-icons";

type Props = { onBack: () => void };

export default function ProfileScreen({ onBack }: Props) {
  const { notes } = useNotes();
  const favoriteNotes = notes.filter(note => note.isFavorite);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#2D9CDB" />
      </TouchableOpacity>

      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.subtitle}>Your Favorite Notes</Text>

      <FlatList
        data={favoriteNotes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.noteContent}>{item.content}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No favorite notes yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#EAF4FF" },
  backButton: { marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 18, marginVertical: 10 },
  noteCard: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10 },
  noteTitle: { fontWeight: "700", fontSize: 16 },
  noteContent: { fontSize: 14, color: "#555" },
  emptyText: { textAlign: "center", marginTop: 20, color: "#888" },
});
