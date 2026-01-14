import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NotesListScreen from "./screens/NotesListScreen";
import UploadNoteScreen from "./screens/UploadNoteScreen";
import NoteDetailScreen from "./screens/NoteDetailScreen";

// Simple screen switching logic without navigation
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<{
    name: string;
    params?: any;
  }>({ name: "Login" });

  const [notes, setNotes] = useState<
    { id: number; title: string; content: string; rating: number }[]
  >([]);

  const openScreen = (name: string, params?: any) => {
    setCurrentScreen({ name, params });
  };

  const updateNotes = (newNotes: typeof notes) => {
    setNotes(newNotes);
  };

  const logout = () => {
    openScreen("Login");
  };

  const renderScreen = () => {
    switch (currentScreen.name) {
      case "Login":
        return (
          <LoginScreen
            onLogin={() => openScreen("NotesList")}
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
            onOpenNote={(note: any) => openScreen("NoteDetail", { note })}
            onLogout={logout}
          />
        );
      case "UploadNote":
        return (
          <UploadNoteScreen
            notes={notes}
            onSave={updateNotes}
            onBack={() => openScreen("NotesList")}
          />
        );
      case "NoteDetail":
        return (
          <NoteDetailScreen
            note={currentScreen.params.note}
            onBack={() => openScreen("NotesList")}
            onRate={updateNotes}
            notes={notes}
            onLogout={logout}
          />
        );
      default:
        return <LoginScreen onLogin={() => openScreen("NotesList")} />;
    }
  };

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
