import { useEffect, useState } from "react";
import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import API_URL from "./services/api";

export default function WebApp() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/notes/ITEC80`)
      .then((r) => r.json())
      .then((data) => {
        console.log("Fetched notes:", data);
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load notes");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading notes...</Text>
      </View>
    );

  if (error)
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Retry" onPress={() => window.location.reload()} />
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
        Web Debug — ITEC80
      </Text>
      {notes.length === 0 ? (
        <Text>No notes found</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderWidth: 1, marginBottom: 8 }}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text>{item.content}</Text>
              <Text>
                Average:{" "}
                {item.avgRating
                  ? Number(item.avgRating).toFixed(1)
                  : "No ratings"}{" "}
                ⭐
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
