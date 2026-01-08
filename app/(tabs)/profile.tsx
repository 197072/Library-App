import React, { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet, Vibration } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { View, Text, Avatar, Button, VStack, Divider } from "native-base";
import { Accelerometer } from "expo-sensors";

export default function Profile() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      const storedEmail = await AsyncStorage.getItem("userEmail");
      if (storedName) setUserName(storedName);
      if (storedEmail) setEmail(storedEmail);
    };
    fetchUser();
  }, []);

  // 🔹 Acelerômetro — detecta sacudida
  useEffect(() => {
    Accelerometer.setUpdateInterval(300); // atualiza a cada 300ms
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const totalForce = Math.abs(x) + Math.abs(y) + Math.abs(z);
      if (totalForce > 2.5) {
        Vibration.vibrate(100);
        Alert.alert("You just shook your phone.");
      }
    });
    return () => subscription && subscription.remove();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Logout", "Do you really want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Leave",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("userName");
          await AsyncStorage.removeItem("userEmail");
          router.replace("/login");
        },
      },
    ]);
  };

  // Simula funções simples
  const handleInvite = () => Alert.alert("Invite Friend", "Feature coming soon!");
  const handleContact = () => Linking.openURL("mailto:libraryapp@gmail.com");
  const handleRate = () => Alert.alert("Rate App", "Redirecting to app store soon!");
  const handlePrivacy = () =>
    Alert.alert("Privacy Policy", "Our policy will be available soon.");
  const handleTerms = () => Alert.alert("Terms & Conditions", "Coming soon!");
  const handleSettings = () => Alert.alert("Settings", "Settings page coming soon!");

  const initial = userName ? userName.charAt(0).toUpperCase() : "?";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar
          bg="#1B693C"
          size="2xl"
          mb={3}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
        >
          {initial}
        </Avatar>

        <Text style={styles.name}>{userName || "Guest"}</Text>
        <Text style={styles.email}>{email || "user@example.com"}</Text>
      </View>

      {/* Opções */}
      <VStack space={2} mx={5} mt={4} borderTopWidth={1} borderColor="#eee">
        <ProfileOption
          icon="settings-outline"
          label="Account Settings"
          onPress={handleSettings}
        />
        <Divider />
        <ProfileOption icon="person-add-outline" label="Invite Friend" onPress={handleInvite} />
        <Divider />
        <ProfileOption icon="mail-outline" label="Contact Us" onPress={handleContact} />
        <Divider />
        <ProfileOption icon="star-outline" label="Rate App" onPress={handleRate} />
        <Divider />
        <ProfileOption
          icon="lock-closed-outline"
          label="Privacy Policy"
          onPress={handlePrivacy}
        />
        <Divider />
        <ProfileOption
          icon="document-text-outline"
          label="Terms & Conditions"
          onPress={handleTerms}
        />
        <Divider />
        <ProfileOption
          icon="log-out-outline"
          label="Logout"
          color="#B00020"
          onPress={handleLogout}
        />
      </VStack>
    </View>
  );
}

function ProfileOption({ icon, label, color = "#1B693C", onPress }: any) {
  return (
    <Button
      variant="ghost"
      justifyContent="flex-start"
      leftIcon={<Ionicons name={icon} size={22} color={color} />}
      onPress={onPress}
      _text={{ color, fontSize: 16, fontWeight: "medium" }}
      style={styles.optionButton}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginTop: 60,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B693C",
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginBottom: 30,
  },
  optionButton: {
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#eee",
    borderRadius: 0,
  },
});
