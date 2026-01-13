import { Platform, StyleSheet } from "react-native";

<<<<<<< HEAD
// Lazy-load platform-specific entry to avoid importing mobile-only libraries on web
export default Platform.OS === "web"
  ? require("./WebApp").default
  : require("./MobileApp").default;
=======
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
>>>>>>> 8cbe8f5 (Initial & First Changes)

// StyleSheet (like CSS but for React Native)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#84cff1",
<<<<<<< HEAD
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  Nav: {
=======
    alignItems: "center",
    justifyContent: "center",
  },
  Nav: {
    flex: 1,
>>>>>>> 8cbe8f5 (Initial & First Changes)
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 10,
  },
});
