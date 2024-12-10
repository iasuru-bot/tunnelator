import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import io, { Socket } from "socket.io-client";

export default function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const socket: Socket = io("http://192.168.1.X:3000");

    socket.on("users", (updatedUsers) => {
      setUsers(updatedUsers);
    });

    // Retourne une fonction de nettoyage
    return () => {
      socket.disconnect(); // Ferme la connexion proprement
    };
  }, []);

  const join = () => {
    const socket: Socket = io("http://192.168.1.65:8081");
    socket.emit("join", name);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Connecte-toi !</Text>
      <TextInput
        placeholder="Entrez votre nom"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />
      <Button title="Rejoindre" onPress={join} />
      <FlatList
        data={users}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}
