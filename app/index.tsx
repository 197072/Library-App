import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Parte verde superior */}
      <View style={styles.topSection}>
        <Text style={styles.logoText}>📚</Text>
        <Text style={styles.appTitle}>Santiago Maior’s{"\n"}Library</Text>
      </View>

      {/* Parte branca inferior */}
      <View style={styles.bottomSection}>
        <Text style={styles.welcome}>Welcome!</Text>
        <View style={styles.divider} />

        {/* Botão Login */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Botão Sign Up */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topSection: {
    flex: 1,
    backgroundColor: "#1B693C",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 60,
    color: "white",
    marginBottom: 10,
  },
  appTitle: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
  },
  bottomSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcome: {
    fontSize: 22,
    color: "#000",
    marginBottom: 10,
  },
  divider: {
    width: 120,
    height: 1,
    backgroundColor: "#000",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#1B693C",
    width: 160,
    paddingVertical: 10,
    borderRadius: 50,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
