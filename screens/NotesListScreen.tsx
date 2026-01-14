import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lecture Notes</Text>
        <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Conditional Logout */}
      {showLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}

      {/* Notes List */}
      <FlatList
        data={sortedNotes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteCard}
            onPress={() => onOpenNote(item)}
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteRating}>⭐ {item.rating}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating Upload Button */}
      <TouchableOpacity style={styles.fab} onPress={onUpload}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0E68C", // khaki color
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#b3882e",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    width: "100%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  avatar: { width: 40, height: 40, borderRadius: 20 },

  // Logout
  logoutButton: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },

  // Note Cards
  noteCard: {
    backgroundColor: "#caa94d",
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    width: "90%",
  },
  noteTitle: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
  noteRating: { fontSize: 14, color: "#000000" },

  // Floating Action Button
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007BFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 6,
  },
  fabText: { fontSize: 30, color: "#fff", fontWeight: "bold" },
});
