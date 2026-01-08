import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      alert("Por favor, insira o seu email.");
      return;
    }
    alert(`Um link de redefinição foi enviado para ${email}.`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subtitle}>Insira o seu email para redefinir a senha.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Enviar Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#1B693C",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    width: "90%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1B693C",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backText: {
    marginTop: 10,
    color: "#1B693C",
    fontSize: 16,
  },
});
