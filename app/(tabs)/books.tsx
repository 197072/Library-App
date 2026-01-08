import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BOOKS_URL } from "../../constants/api";
import { IconButton, Center } from "native-base";

export default function MyBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // 🔹 Buscar livros (GET)
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch(BOOKS_URL);
      const data = await res.json();
      const favorites = data.filter((book: any) => book.isFavorite === true);
      setBooks(favorites);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔄 Atualizar com “pull to refresh”
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  };

  // 🔹 Remover livro dos favoritos (PUT)
  const handleRemove = async (id: string, title: string) => {
    try {
      const res = await fetch(`${BOOKS_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: false }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      Alert.alert("Removed", `"${title}" was removed from My Books.`);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to remove this book.");
    }
  };

  // 🔹 Renderizar livro
  const renderBook = ({ item }: any) => (
    <View style={styles.bookCard}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        onPress={() =>
          router.push({
            pathname: "/bookDetails",
            params: {
              id: item.id,
              title: item.title,
              author: item.author,
              image: item.image,
              description: item.description,
              isFavorite: item.isFavorite,
            },
          })
        }
      >
        <Image
          source={{
            uri:
              typeof item.image === "string" && item.image.startsWith("http")
                ? item.image
                : "https://via.placeholder.com/150",
          }}
          style={styles.bookImage}
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {item.author}
          </Text>
        </View>
      </TouchableOpacity>

      {/* 🔹 Botão de deletar (NativeBase) */}
      <IconButton
        icon={<Ionicons name="trash-outline" size={20} color="#fff" />}
        borderRadius="full"
        backgroundColor="#D9534F"
        onPress={() => handleRemove(item.id, item.title)}
        _pressed={{ opacity: 0.7 }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>My Books</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1B693C" style={{ marginTop: 30 }} />
      ) : books.length === 0 ? (
        <Center flex={1}>
          <Ionicons name="library-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>You haven't added any books yet.</Text>
        </Center>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBook}
          contentContainerStyle={styles.listContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 70,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B693C",
    marginBottom: 20,
    textAlign: "left",
  },

  listContainer: {
    paddingHorizontal: 4,
    paddingTop: 10,
  },
  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B693C",
  },
  author: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  emptyText: {
    color: "#777",
    marginTop: 10,
    fontSize: 16,
  },
});
