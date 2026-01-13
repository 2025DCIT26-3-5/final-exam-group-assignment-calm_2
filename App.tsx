import { Platform, StyleSheet } from "react-native";

// Lazy-load platform-specific entry to avoid importing mobile-only libraries on web
export default Platform.OS === "web"
  ? require("./WebApp").default
  : require("./MobileApp").default;

// StyleSheet (like CSS but for React Native)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#84cff1",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  Nav: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 10,
  },
});
