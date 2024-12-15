import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tunnel Quiz</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Presenter')}
      >
        <Text style={styles.buttonText}>Je suis le Présentateur</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Player')}
      >
        <Text style={styles.buttonText}>Je suis un Joueur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#023047',  // Couleur de fond
  },
  title: {
    fontSize: 32,
    color: '#FFB703',  // Couleur du titre
    marginBottom: 40,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#219EBC',  // Couleur des boutons
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
