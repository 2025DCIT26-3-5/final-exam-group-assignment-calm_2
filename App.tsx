import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NoteScreen from './screens/NoteScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import NoteDetailScreen from './screens/NoteDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
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
