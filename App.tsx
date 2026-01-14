import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NotesListScreen from "./screens/NotesListScreen";
import UploadNoteScreen from "./screens/UploadNoteScreen";
import NoteDetailScreen from "./screens/NoteDetailScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<{
    name: string;
    params?: any;
  }>({ name: "Login" });
  const [notes, setNotes] = useState<any[]>([]);

  const openScreen = (name: string, params?: any) =>
    setCurrentScreen({ name, params });

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3000/notes");
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  const renderScreen = () => {
    switch (currentScreen.name) {
      case "Login":
        return (
          <LoginScreen
            onLogin={() => {
              fetchNotes();
              openScreen("NotesList");
            }}
            onRegister={() => openScreen("Register")}
          />
        );
      case "Register":
        return <RegisterScreen onBack={() => openScreen("Login")} />;
      case "NotesList":
        return (
          <NotesListScreen
            notes={notes}
            onUpload={() => openScreen("UploadNote")}
            onOpenNote={(note) => openScreen("NoteDetail", { note })}
          />
        );
      case "UploadNote":
        return (
          <UploadNoteScreen
            notes={notes}
            onSave={fetchNotes}
            onBack={() => {
              fetchNotes();
              openScreen("NotesList");
            }}
          />
        );
      case "NoteDetail":
        return (
          <NoteDetailScreen
            note={currentScreen.params.note}
            onBack={() => {
              fetchNotes();
              openScreen("NotesList");
            }}
            notes={notes}
            onRate={fetchNotes}
          />
        );
      default:
        return (
          <LoginScreen
            onLogin={() => openScreen("NotesList")}
            onRegister={() => openScreen("Register")}
          />
        );
    }
  };

  useEffect(() => {
    if (currentScreen.name === "NotesList") fetchNotes();
  }, [currentScreen.name]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
