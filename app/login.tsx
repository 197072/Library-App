import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    AsyncStorage.setItem("userEmail", email);

    alert("Login realizado com sucesso!");
      // Recupera o nome salvo (feito no Sign Up)
  //const savedName = AsyncStorage.getItem("userName");


  router.push("/(tabs)/home");
};

  return (
    <View style={styles.container}>
      {/* TOPO VERDE com o nome da app */}
      <View style={styles.topSection}>
        <Text style={styles.logoText}>📚</Text>
        <Text style={styles.appTitle}>Santiago Maior’s{"\n"}Library</Text>
      </View>

      {/* PARTE BRANCA com formulário */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => router.push("/forgotPass")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text>Don't you have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.signupText}> Sign up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  topSection: {
    flex: 1,
    backgroundColor: "#1B693C",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
   logoText: {
    fontSize: 60,
    color: "white",
    marginBottom: 10,
  },
  appTitle: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
  },

  bottomSection: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: "#1B693C",
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotText: {
    alignSelf: "flex-end",
    color: "#1B693C",
    marginBottom: 25,
    fontSize: 15,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#1B693C",
    width: 160,
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signupRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  signupText: {
    color: "#1B693C",
    fontWeight: "bold",
  },
});
