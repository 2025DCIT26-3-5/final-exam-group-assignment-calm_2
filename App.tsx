import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NotesListScreen from "./screens/NotesListScreen";
import UploadNoteScreen from "./screens/UploadNoteScreen";
import NoteDetailScreen from "./screens/NoteDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingScreen from "./screens/SettingScreen";
import { NotesProvider } from "./contexts/NotesContext";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<{
    name: string;
    params?: any;
  }>({ name: "Login" });

  // ✅ Track the logged-in user's email
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string>("");

  const openScreen = (name: string, params?: any) => {
    setCurrentScreen({ name, params });
  };

  const logout = () => {
    setLoggedInUserEmail(""); // clear email on logout
    openScreen("Login");
  };

  const renderScreen = () => {
    switch (currentScreen.name) {
      case "Login":
        return (
          <LoginScreen
            // Pass email from LoginScreen back to App
            onLogin={(email: string) => {
              setLoggedInUserEmail(email);
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
            onUpload={() => openScreen("UploadNote")}
            onOpenNote={(note: any) => openScreen("NoteDetail", { note })}
            onLogout={logout}
            onOpenProfile={() => openScreen("Profile")}
            onOpenSettings={() => openScreen("Settings")}
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

      case "Profile":
        return <ProfileScreen onBack={() => openScreen("NotesList")} />;

      case "Settings":
        return (
          <SettingScreen
            onBack={() => openScreen("NotesList")}
            userEmail={loggedInUserEmail} // now dynamically shows the logged-in email
          />
        );

      default:
        return (
          <LoginScreen
            onLogin={(email: string) => {
              setLoggedInUserEmail(email);
              openScreen("NotesList");
            }}
            onRegister={() => openScreen("Register")}
          />
        );
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
