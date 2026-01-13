import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  // State Hook
  const [count, setCount] = useState(0);
  const [name, setName] = useState("World");

  return (
    <View style={styles.container}>
      {/* Native Feature: Controls phone's status bar */}
      <StatusBar style="light" backgroundColor="red" />

      {/* State Display */}
      <Text style={styles.counter}>Count: {count}</Text>

      {/* Native Button */}
      <Button title="Increment" onPress={() => setCount(count + 1)} />

      <Button
        title="Change Name"
        onPress={() => setName(name === "World" ? "Student" : "World")}
      />
    </View>
  );
}

// StyleSheet (like CSS but for React Native)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#84cff1",
    alignItems: "center",
    justifyContent: "center",
  },
  Nav: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 10,
  },
  counter: {
    fontSize: 16,
    color: "white",
    marginVertical: 20,
  },
});
