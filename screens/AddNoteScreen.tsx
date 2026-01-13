import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import API_URL from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "AddNote">;

export default function AddNoteScreen({ navigation, route }: Props) {
  const { course } = route.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitNote = () => {
    if (!title || !content) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, course }),
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
        navigation.goBack();
      })
      .catch(() => {
        setError("Failed to submit note");
        setLoading(false);
      });
  };

  if (loading)
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Submitting note...</Text>
      </View>
    );

  if (error)
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Retry" onPress={submitNote} />
      </View>
    );

  return (
    <View style={{ padding: 20 }}>
      <Text>Title</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        value={title}
        onChangeText={setTitle}
      />

      <Text>Content</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, height: 100, marginBottom: 10 }}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Button title="Submit Note" onPress={submitNote} />
    </View>
  );
}
