import { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketContext';
import CategorySelector from '../components/CategorySelector';
import GameControl from '../components/GameControl';

const PresenterScreen = () => {
  const socket = useSocket();
  const [questions, setQuestions] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (socket) {
      socket.on('newQuestion', (question: string) => {
        setQuestions((prevQuestions) => [...prevQuestions, question]);
      });
    }
  }, [socket]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    if (socket) {
      socket.emit('chooseCategory', newCategory);
    }
  };

  return (
    <div>
      <h2>Présentateur</h2>
      <CategorySelector onCategoryChange={handleCategoryChange} />
      <GameControl questions={questions} />
    </div>
  );
};

export default PresenterScreen;
