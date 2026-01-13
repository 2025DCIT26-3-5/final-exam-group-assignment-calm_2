import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotesScreen from "./screens/NoteScreen";
import NoteDetailScreen from "./screens/NoteDetailScreen";
import AddNoteScreen from "./screens/AddNoteScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MobileApp() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="red" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="NotesScreen">
          <Stack.Screen
            name="NotesScreen"
            component={NotesScreen}
            initialParams={{ course: "ITEC80" }}
            options={{ title: "Notes" }}
          />
          <Stack.Screen
            name="NoteDetail"
            component={NoteDetailScreen}
            options={{ title: "Note" }}
          />
          <Stack.Screen
            name="AddNote"
            component={AddNoteScreen}
            options={{ title: "Add Note" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#84cff1",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
