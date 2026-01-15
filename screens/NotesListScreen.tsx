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
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
  const { notes, deleteNote, toggleFavorite } = useNotes();
  const [showLogout, setShowLogout] = useState(false);
  const [search, setSearch] = useState("");

  const getAvg = (ratings: number[]) =>
    ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

  // ✅ FIXED: id is number
  const confirmDelete = (id: number) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteNote(id) },
      ]
    );
  };

  const filteredNotes = [...notes]
    .filter(note =>
      note.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aFav = !!a.isFavorite;
      const bFav = !!b.isFavorite;

      if (aFav === bFav) {
        return getAvg(b.ratings) - getAvg(a.ratings);
      }
      return aFav ? -1 : 1;
    });

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

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#888"
        />
      </View>

      {/* Notes */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator
        contentContainerStyle={styles.listContent}
        style={{ width: screenWidth }}
        renderItem={({ item }) => (
          <View style={styles.noteCardWrapper}>
            <View style={styles.noteCard}>

              {/* Actions */}
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                  <Ionicons
                    name={item.isFavorite ? "star" : "star-outline"}
                    size={22}
                    color={item.isFavorite ? "#F2C94C" : "#BDBDBD"}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onOpenNote(item)}>
                  <Ionicons name="pencil" size={20} color="#2D9CDB" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <Ionicons name="trash" size={20} color="#E74C3C" />
                </TouchableOpacity>
              </View>

              {/* Content */}
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => onOpenNote(item)}
                activeOpacity={0.8}
              >
                <Text style={styles.noteTitle} numberOfLines={2}>
                  {item.title}
                </Text>

                <Text style={styles.noteContent} numberOfLines={3}>
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
          </View>
        )}
      />

      {/* FAB */}
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

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomColor: "#D6E6F5",
    borderBottomWidth: 1,
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
    top: 75,
    right: 20,
    zIndex: 10,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

  searchContainer: {
    width: "100%",
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

  listContent: {
    alignItems: "center",
    paddingBottom: 120,
  },

  noteCardWrapper: {
    alignItems: "center",
  },

  noteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    width: 400,
    height: 140,
    marginVertical: 10,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },

  cardActions: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    gap: 14,
    zIndex: 2,
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
  },

  ratingText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

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
    elevation: 8,
  },

  fabText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
});
