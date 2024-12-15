import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSocket } from '../../hooks/useSocket';  // Gestion des sockets

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  answers: Answer[];
}

const PlayerScreen: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const socket = useSocket();  // Connexion au socket

  useEffect(() => {
    socket.on('newQuestion', (data: { question: Question }) => {
      setCurrentQuestion(data.question);  // Réception d'une nouvelle question
    });
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    socket.emit('playerAnswer', { isCorrect });  // Envoi de la réponse
    setCurrentQuestion(null);  // Attente d'une nouvelle question
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Joueur</Text>
      {currentQuestion ? (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          {currentQuestion.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={styles.answerButton}
              onPress={() => handleAnswer(answer.isCorrect)}
            >
              <Text style={styles.answerText}>{answer.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.infoText}>En attente d'une question...</Text>
      )}
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
  questionContainer: {
    backgroundColor: '#219EBC',
    borderRadius: 10,
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#FFB703',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  answerText: {
    color: '#023047',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PlayerScreen;
