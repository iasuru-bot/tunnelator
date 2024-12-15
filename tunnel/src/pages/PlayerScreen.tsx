import { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketContext';
import QuestionCard from '../components/QuestionCard';
import CategorySelector from '../components/CategorySelector';

const PlayerScreen = () => {
  const socket = useSocket();
  const [question, setQuestion] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (socket) {
      socket.on('newQuestion', (question: string) => {
        setQuestion(question);
      });
    }
  }, [socket]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    if (socket) {
      socket.emit('chooseCategory', newCategory);
    }
  };

  const handleAnswer = (answer: string) => {
    if (socket) {
      socket.emit('answerQuestion', answer);
    }
  };

  return (
    <div>
      <h2>Joueur</h2>
      <CategorySelector onCategoryChange={handleCategoryChange} />
      {question && <QuestionCard question={question} onAnswer={handleAnswer} />}
    </div>
  );
};

export default PlayerScreen;
