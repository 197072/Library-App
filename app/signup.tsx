import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!username || !email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    

    //router.push("/login");
    AsyncStorage.setItem("userName", username);
    AsyncStorage.setItem("userEmail", email);

    alert(`Conta criada para ${username}!`);
    router.push("/(tabs)/home");

  };

  const handleGoogleSignUp = () => {
    alert("Google Sign Up em breve 🚀");
  };

  return (
    <View style={styles.container}>
      {/* Topo verde com nome da app */}
      <View style={styles.topSection}>
        <Text style={styles.logoText}>📚</Text>
        <Text style={styles.appTitle}>Santiago Maior’s{"\n"}Library</Text>
      </View>

      {/* Parte branca com formulário */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Sign Up</Text>


        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#777"
          value={username}
          onChangeText={setUsername}
        />

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

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Linha divisória */}
        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Botão Google */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png",
            }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Sign up with Google</Text>
        </TouchableOpacity>

        {/* Link para Login */}
        <View style={styles.loginRow}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginText}> Login</Text>
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
    justifyContent: "center",
    alignItems: "center",
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

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: 20,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    width: 100,
  },
  orText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 14,
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },

  loginRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    color: "#1B693C",
    fontWeight: "bold",
  },
});
