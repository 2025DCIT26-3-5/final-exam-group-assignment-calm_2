import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NotesListScreen from "./screens/NotesListScreen";
import UploadNoteScreen from "./screens/UploadNoteScreen";
import NoteDetailScreen from "./screens/NoteDetailScreen";
import { NotesProvider } from "./contexts/NotesContext";

// Simple screen switching logic without navigation
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<{
    name: string;
    params?: any;
  }>({ name: "Login" });

  const openScreen = (name: string, params?: any) => {
    setCurrentScreen({ name, params });
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
            onUpload={() => openScreen("UploadNote")}
            onOpenNote={(note: any) => openScreen("NoteDetail", { note })}
            onLogout={logout}
          />
        );
      case "UploadNote":
        return <UploadNoteScreen onBack={() => openScreen("NotesList")} />;
      case "NoteDetail":
        return (
          <NoteDetailScreen
            note={currentScreen.params?.note}
            onBack={() => openScreen("NotesList")}
            onLogout={logout}
          />
        );
      default:
        return <LoginScreen onLogin={() => openScreen("NotesList")} />;
    }
  };

  return (
    <NotesProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        {renderScreen()}
      </View>
    </NotesProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
