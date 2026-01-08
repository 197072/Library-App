import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BOOKS_URL } from "../../constants/api";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 🔹 Buscar nome do utilizador
  useEffect(() => {
    const fetchUser = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      if (storedName) setUserName(storedName);
    };
    fetchUser();
  }, []);

  // 🔹 Buscar livros da API (GET)
 useFocusEffect(
  useCallback(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch(BOOKS_URL);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
    
  }, [])

  
);

  // 🔹 Filtrar livros conforme a pesquisa
  const filteredBooks = books.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Filtros por seção
const popularBooks = filteredBooks.filter((b) => b.category === "Popular");
const recommendedBooks = filteredBooks.filter((b) => b.category === "Recommended");
const topRatedBooks = filteredBooks.filter((b) => b.category === "Top Rated");
const newArrivals = filteredBooks.filter((b) => b.category === "New Arrivals");


  const renderBookCard = (item: any) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() =>
        router.push({
          pathname: "/bookDetails",
          params: {
            id: item.id,
            title: item.title,
            author: item.author,
            image: item.image,
            description: item.description,
            isFavorite: item.isFavorite.toString(),
          },
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <Text style={styles.bookTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.bookAuthor} numberOfLines={1}>
        {item.author}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Welcome{userName ? `, ${userName}` : ""}
          </Text>
          <Text style={styles.subtitle}>Have you read today?</Text>
        </View>
        <TouchableOpacity onPress={() => alert("No new notifications")}>
          <Ionicons name="notifications-outline" size={26} color="#1B693C" />
        </TouchableOpacity>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#777" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          placeholderTextColor="#777"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Erro / Carregamento */}
      {loading && (
        <ActivityIndicator size="large" color="#1B693C" style={{ margin: 20 }} />
      )}
      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}

      {/* Seções */}
      {!loading && !error && (
        <>

         <Text style={styles.sectionTitle}>New Arrivals</Text>
          <FlatList
            horizontal
            data={newArrivals}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderBookCard(item)}
            style={styles.listSpacing}
          />

          <Text style={styles.sectionTitle}>Popular</Text>
          <FlatList
            horizontal
            data={popularBooks}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderBookCard(item)}
            style={styles.listSpacing}
          />

          <Text style={styles.sectionTitle}>Recommended</Text>
          <FlatList
            horizontal
            data={recommendedBooks}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderBookCard(item)}
            style={styles.listSpacing}
          />

          <Text style={styles.sectionTitle}>Top Rated</Text>
          <FlatList
            horizontal
            data={topRatedBooks}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderBookCard(item)}
            style={styles.listSpacing}
          />

          {/* Caso nenhum livro corresponda à pesquisa */}
          {filteredBooks.length === 0 && (
            <Text style={{ textAlign: "center", color: "#999", marginTop: 20 }}>
              No books found matching your search.
            </Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 60, paddingHorizontal: 20 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  greeting: {
    fontSize: 22,
    color: "#1B693C",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#777",
    fontSize: 14,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1B693C",
  },

  bookCard: {
    marginRight: 14,
    width: 120,
  },
  bookImage: {
    width: 120,
    height: 170,
    borderRadius: 10,
    marginBottom: 6,
  },
  bookTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  bookAuthor: {
    fontSize: 12,
    color: "#777",
  },

  listSpacing: {
    marginBottom: 25,
  },
});
