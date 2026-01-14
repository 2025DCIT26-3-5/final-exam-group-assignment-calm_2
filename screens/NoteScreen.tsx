import React, { useEffect, useState } from 'react';
import { View, FlatList, Button } from 'react-native';
import { fetchNotes } from '../services/api';
import { Note } from '../types';

export default function NoteScreen({ navigation }: any) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes().then(setNotes);
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Button title="Upload Note" onPress={() => navigation.navigate('AddNote')} />

      <FlatList
        data={notes}
        keyExtractor={(item) => item._id!}
        renderItem={({ item }) => (
          <Button
            title={item.title}
            onPress={() => navigation.navigate('Details', { note: item })}
          />
        )}
      />
    </View>
  );
}
