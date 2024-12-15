// import React, { useEffect, useState } from "react";
// import { View, Text, TextInput, Button, FlatList } from "react-native";
// import io, { Socket } from "socket.io-client";

// export default function App() {
//   const [name, setName] = useState("");
//   const [users, setUsers] = useState<string[]>([]);

//   useEffect(() => {
//     const socket: Socket = io("http://192.168.1.65:3000");

//     socket.on("users", (updatedUsers) => {
//       setUsers(updatedUsers);
//     });

//     // Retourne une fonction de nettoyage
//     return () => {
//       socket.disconnect(); // Ferme la connexion proprement
//     };
//   }, []);

//   const join = () => {
//     console.log(name);
    
//     const socket: Socket = io("http://192.168.1.65:3000");
//     socket.emit("join", name);
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 24 }}>Connecte-toi !</Text>
//       <TextInput
//         placeholder="Entrez votre nom"
//         value={name}
//         onChangeText={setName}
//         style={{
//           borderWidth: 1,
//           padding: 10,
//           marginVertical: 10,
//           borderRadius: 5,
//         }}
//       />
//       <Button title="Rejoindre" onPress={join} />
//       <FlatList
//         data={users}
//         keyExtractor={(item, index) => `${item}-${index}`}
//         renderItem={({ item }) => <Text>{item}</Text>}
//       />
//     </View>
//   );
// }


import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { useColorScheme } from '../../hooks/useColorScheme'; // Hook personnalisé pour gérer le thème

import HomeScreen from '../screens/HomeScreen';
import PresenterScreen from '../screens/PresenterScreen';
import PlayerScreen from '../screens/PlayerScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const StackNavigator = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();  // Détection du thème
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StackNavigator.Navigator initialRouteName="Home">
        <StackNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <StackNavigator.Screen
          name="Presenter"
          component={PresenterScreen}
          options={{ headerShown: false }}
        />
        <StackNavigator.Screen
          name="Player"
          component={PlayerScreen}
          options={{ headerShown: false }}
        />
      </StackNavigator.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
