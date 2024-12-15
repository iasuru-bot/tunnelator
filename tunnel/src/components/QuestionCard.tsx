import React, { useState } from 'react';

interface QuestionCardProps {
  question: string;
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onAnswer(answer);
    setAnswer('');
  };

  return (
    <div>
      <p>{question}</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Ta réponse"
      />
      <button onClick={handleSubmit}>Répondre</button>
    </div>
  );
};

export default QuestionCard;
