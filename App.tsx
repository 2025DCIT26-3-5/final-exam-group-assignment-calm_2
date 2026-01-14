import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NoteScreen from './screens/NoteScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import NoteDetailScreen from './screens/NoteDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
<<<<<<< HEAD
=======
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

>>>>>>> 7c407d94c32b9753bc6faf6ea225e8bd121b43d8
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Notes"
          component={NoteScreen}
          options={{ title: 'Lecture Notes' }}
        />
        <Stack.Screen
          name="AddNote"
          component={AddNoteScreen}
          options={{ title: 'Upload Note' }}
        />
        <Stack.Screen
          name="Details"
          component={NoteDetailScreen}
          options={{ title: 'Note Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
