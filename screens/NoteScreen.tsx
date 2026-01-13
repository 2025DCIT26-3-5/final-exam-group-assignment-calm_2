import { View, Text, FlatList, Button, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import API_URL from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Note, RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "NotesScreen">;

export default function NotesScreen({ route, navigation }: Props) {
  const { course } = route.params;
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = () => {
    setLoading(true);
    fetch(`${API_URL}/notes/${encodeURIComponent(course)}`)
      .then((res) => res.json())
      .then((data: Note[]) => {
        setNotes(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load notes");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading)
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading notes...</Text>
      </View>
    );

  if (error)
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Retry" onPress={fetchNotes} />
      </View>
    );

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{course}</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderWidth: 1, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>
              Average Rating:{" "}
              {item.avgRating ? item.avgRating.toFixed(1) : "No ratings yet"} ⭐
            </Text>
            <Button
              title="View"
              onPress={() => navigation.navigate("NoteDetail", { note: item })}
            />
          </View>
        )}
      />
      <Button
        title="Add Note"
        onPress={() => navigation.navigate("AddNote", { course })}
      />
    </View>
  );
}
