import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSocket } from '../../hooks/useSocket';  // Gestion des sockets

interface Category {
  id: number;
  name: string;
  questionsLeft: number;
}

const PresenterScreen: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Histoire', questionsLeft: 5 },
    { id: 2, name: 'Science', questionsLeft: 4 },
    { id: 3, name: 'Géographie', questionsLeft: 6 },
  ]);
  const socket = useSocket();  // Connection au socket

  const handleSelectCategory = (category: Category) => {
    socket.emit('presenterSelectCategory', { categoryId: category.id });
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => handleSelectCategory(item)}
    >
      <Text style={styles.categoryText}>
        {item.name} ({item.questionsLeft} questions restantes)
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Présentateur</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#023047',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#FFB703',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryButton: {
    backgroundColor: '#219EBC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PresenterScreen;
