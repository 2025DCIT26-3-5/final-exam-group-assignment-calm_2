import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Dimensions,
} from "react-native";
import { useNotes, Note } from "../contexts/NotesContext";

type Props = {
  onUpload: () => void;
  onOpenNote: (note: Note) => void;
  onLogout: () => void;
};

export default function NotesListScreen({
  onUpload,
  onOpenNote,
  onLogout,
}: Props) {
  const { notes } = useNotes();
  const [showLogout, setShowLogout] = useState(false);
  const [search, setSearch] = useState("");

  const getAvg = (ratings: number[]) =>
    ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

  const filteredNotes = [...notes]
    .filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => getAvg(b.ratings) - getAvg(a.ratings));

  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>UniNotes</Text>

        <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      {showLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#888"
        />
      </View>

      {/* Notes List - full width for scrollbar */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={true} // scrollbar on the far right
        contentContainerStyle={styles.listContent}
        style={{ width: screenWidth }} // full width for scroll bar
        renderItem={({ item }) => (
          <View style={styles.noteCardWrapper}>
            <TouchableOpacity
              style={styles.noteCard}
              onPress={() => onOpenNote(item)}
            >
              <Text
                style={styles.noteTitle}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
              <Text
                style={styles.noteContent}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {item.content}
              </Text>
              <View style={styles.cardFooter}>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>
                    ⭐ {getAvg(item.ratings).toFixed(1)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#EAF4FF",
  },

  /* Header */
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
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
    marginTop: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  /* Logout */
  logoutButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    position: "absolute",
    top: 75,
    right: 20,
    zIndex: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* Search Bar */
  searchContainer: {
    width: "100%",
    minWidth: 420,
    maxWidth: 800,
    alignSelf: "center",
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#D6E6F5",
  },

  /* Notes List */
  listContent: {
    alignItems: "center",
    paddingBottom: 120,
  },
  noteCardWrapper: {
    alignItems: "center", // center the fixed-width card inside full-width list
  },
  noteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    width: 400, // fixed width card
    height: 140,
    marginVertical: 10,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  noteContent: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  cardFooter: {
    alignItems: "flex-end",
  },
  ratingBadge: {
    backgroundColor: "#2D9CDB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    minWidth: 44,
    alignItems: "center",
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  /* Floating Upload Button */
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2D9CDB",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2D9CDB",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  fabText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
});
