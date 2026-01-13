import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { createNote } from '../services/api';

export default function AddNoteScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [professor, setProfessor] = useState('');
  const [content, setContent] = useState('');

  const submit = async () => {
    await createNote({
      title,
      professor,
      content,
      rating: 0,
    });

    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Lecture Title" onChangeText={setTitle} />
      <TextInput placeholder="Professor" onChangeText={setProfessor} />
      <TextInput
        placeholder="Notes"
        multiline
        style={{ height: 120 }}
        onChangeText={setContent}
      />
      <Button title="Upload Anonymously" onPress={submit} />
    </View>
  );
}
