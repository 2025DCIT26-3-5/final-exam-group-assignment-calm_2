import { useState } from "react";
import { View, Text, Button, ActivityIndicator, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import StarRating from "../components/StarRating";
import API_URL from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "NoteDetail">;

export default function NoteDetailScreen({ route }: Props) {
  const { note } = route.params;
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRating = () => {
    if (rating === 0) {
      Alert.alert("Error", "Please select a rating");
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/ratings/${note.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    })
      .then((res) => res.json())
      .then((updatedNote) => {
        setLoading(false);
        Alert.alert("Success", `You rated this note ${rating} stars`);
        note.avgRating =
          updatedNote.ratings.reduce((a: number, b: number) => a + b, 0) /
          updatedNote.ratings.length;
      })
      .catch(() => {
        setError("Failed to submit rating");
        setLoading(false);
      });
  };

  if (loading)
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Submitting rating...</Text>
      </View>
    );

  if (error)
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Retry" onPress={submitRating} />
      </View>
    );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{note.title}</Text>
      <Text style={{ fontStyle: "italic", marginBottom: 10 }}>
        Uploaded by: Anonymous
      </Text>
      <Text style={{ marginBottom: 10 }}>{note.content}</Text>
      <Text style={{ marginBottom: 10 }}>
        Current Average Rating:{" "}
        {note.avgRating ? note.avgRating.toFixed(1) : "No ratings yet"} ⭐
      </Text>

      <Text>Rate this note:</Text>
      <StarRating rating={rating} setRating={setRating} />

      <Button title="Submit Rating" onPress={submitRating} />
    </View>
  );
}
