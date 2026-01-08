import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "native-base"; 
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BOOKS_URL } from "../../constants/api";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Autorize o acesso às fotos.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleAddBook = async () => {
    if (!title || !author || !description || !category) {
      Alert.alert("Erro", "Preencha todos os campos antes de adicionar.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(BOOKS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          description,
          category,
          image: image || "https://via.placeholder.com/150",
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      Alert.alert("Sucesso", "Livro adicionado com sucesso!");
      setTitle("");
      setAuthor("");
      setDescription("");
      setCategory("");
      setImage(null);
    } catch (e: any) {
      Alert.alert("Erro", e?.message || "Não foi possível adicionar o livro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 🔹 Topo com botão voltar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={26} color="#1B693C" />
          </TouchableOpacity>
          <Text style={styles.title}>Add New Book</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#777"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Author"
          placeholderTextColor="#777"
          value={author}
          onChangeText={setAuthor}
        />

        <TextInput
          style={styles.input}
          placeholder="Category (Popular, Recommended, Top Rated...)"
          placeholderTextColor="#777"
          value={category}
          onChangeText={setCategory}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Description"
          placeholderTextColor="#777"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadText}>📸 Upload Cover Image</Text>
        </TouchableOpacity>

        {/* ✅ NativeBase Button */}
        <Button
          onPress={handleAddBook}
          isLoading={loading}
          colorScheme="emerald"
          borderRadius="full"
          size="lg"
          width="100%"
          _text={{ fontWeight: "bold", fontSize: 16 }}
        >
          Add Book
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
     flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 70,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B693C",
    marginBottom: 30,
    alignSelf: "flex-start",
    textAlign: "left",
    width: "100%",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#1B693C",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  uploadText: {
    color: "#1B693C",
    fontWeight: "bold",
  },
});
