import React, { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  UIManager,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Center,
  Spinner,
  IconButton,
} from "native-base";
import { BOOKS_URL } from "../constants/api";

// 🔹 Habilitar animações suaves no Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function BookDetails() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const title = Array.isArray(params.title) ? params.title[0] : params.title;
  const author = Array.isArray(params.author) ? params.author[0] : params.author;
  const image = Array.isArray(params.image) ? params.image[0] : params.image;
  const description = Array.isArray(params.description)
    ? params.description[0]
    : params.description;
  const isFavoriteParam = Array.isArray(params.isFavorite)
    ? params.isFavorite[0]
    : params.isFavorite;

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(isFavoriteParam === "true");
  const [fetching, setFetching] = useState(true);

  const router = useRouter();

  // 🔹 Buscar estado real do livro na API
  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      try {
        setFetching(true);
        const res = await fetch(`${BOOKS_URL}/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setFavorite(data.isFavorite === true);
      } catch (err) {
        console.error("❌ Erro ao buscar livro:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchBook();
  }, [id]);

  // 🔹 Adicionar livro aos favoritos (PATCH)
  const handleAddToFavorites = async () => {
    try {
      if (!id) return Alert.alert("Error", "Invalid book ID");
      setLoading(true);

      const res = await fetch(`${BOOKS_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: true }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFavorite(true);

      setTimeout(() => {
        Alert.alert("Added!", `"${title}" was added to your books!`);
        router.push("/(tabs)/books");
      }, 600);
    } catch (err) {
      console.error("Erro no PATCH:", err);
      Alert.alert("Error", "Failed to add this book.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Nova função — “Read Book”
  const handleReadBook = () => {
    Alert.alert("📖 Read Book", "This feature will allow you to read the book soon!");
  };

  // Mostrar / esconder sinopse
  const toggleDescription = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const displayedText =
    expanded || !description
      ? description
      : description.slice(0, 160) + (description.length > 160 ? "..." : "");

  // 🔹 Loader enquanto busca dados
  if (fetching) {
    return (
      <Center flex={1} bg="#F4F7F6">
        <Spinner size="lg" color="#1B693C" />
      </Center>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={{ flex: 1, backgroundColor: "#F4F7F6" }}>
        {/* Topo com botão voltar */}
        <HStack
          justifyContent="space-between"
          alignItems="center"
          px={5}
          pt={16}
          pb={3}
        >
          <IconButton
            icon={<Ionicons name="chevron-back" size={26} color="#1B693C" />}
            onPress={() => router.back()}
          />
          <Text
            numberOfLines={1}
            bold
            color="#1B693C"
            fontSize="lg"
            flex={1}
            textAlign="center"
          >
            {title}
          </Text>
          <IconButton
            icon={<Ionicons name="ellipsis-horizontal" size={22} color="#1B693C" />}
          />
        </HStack>

        {/* Card principal */}
        <Box bg="#fff" mx={5} p={5} borderRadius={20} shadow={3}>
          <Text fontSize="sm" color="#777" textAlign="center" mb={2}>
            Book Details
          </Text>

          <Center mb={4}>
            <Image
              source={{
                uri:
                  typeof image === "string" && image.startsWith("http")
                    ? image
                    : "https://via.placeholder.com/150",
              }}
              style={{
                width: 160,
                height: 230,
                borderRadius: 12,
              }}
            />
          </Center>

          <Text
            fontSize="xl"
            fontWeight="bold"
            color="#1B693C"
            textAlign="center"
            mb={1}
          >
            {title}
          </Text>
          <Text color="#555" textAlign="center" mb={5}>
            by {author}
          </Text>

          {/* Linha de estatísticas */}
          <HStack
            justifyContent="space-around"
            bg="#F4F7F6"
            borderRadius={12}
            py={3}
            mb={5}
          >
            <HStack alignItems="center" space={1}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text fontSize="sm">4.8 / 5</Text>
            </HStack>
            <HStack alignItems="center" space={1}>
              <Ionicons name="book" size={16} color="#1B693C" />
              <Text fontSize="sm">2.1k Reads</Text>
            </HStack>
            <HStack alignItems="center" space={1}>
              <Ionicons name="time-outline" size={16} color="#1B693C" />
              <Text fontSize="sm">340 Pages</Text>
            </HStack>
          </HStack>

          {/* Sinopse */}
          <VStack mb={6}>
            <Text fontSize="md" bold color="#1B693C" mb={1}>
              Synopsis
            </Text>
            <Text fontSize="sm" color="#444" lineHeight={20} textAlign="justify">
              {displayedText}
            </Text>

            {description && description.length > 160 && (
              <Button
                variant="ghost"
                mt={1}
                _text={{
                  color: "#1B693C",
                  fontWeight: "bold",
                }}
                onPress={toggleDescription}
              >
                {expanded ? "Show Less" : "Show More"}
              </Button>
            )}
          </VStack>

          {/* Botão principal */}
          <Button
            bg={favorite ? "#ccc" : "#1B693C"}
            borderRadius="full"
            py={3.5}
            isLoading={loading}
            isDisabled={favorite}
            leftIcon={
              <Ionicons
                name={favorite ? "checkmark-outline" : "bookmark-outline"}
                size={18}
                color="#fff"
              />
            }
            _text={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
            }}
            onPress={handleAddToFavorites}
          >
            {favorite ? "Added to My Books" : "Add to My Books"}
          </Button>

          {/* 🔹 Novo botão Read Book */}
          <Button
            mt={3}
            bg="#1B693C"
            borderRadius="full"
            py={3.5}
            leftIcon={<Ionicons name="book-outline" size={18} color="#fff" />}
            _text={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
            }}
            onPress={handleReadBook}
          >
            Read Book
          </Button>
        </Box>
      </ScrollView>
    </>
  );
}
