import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [name, setName] = useState("World");

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="red" />

      <View id="Nav" style={styles.Nav}>
        Navigation Bar
      </View>
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
});
