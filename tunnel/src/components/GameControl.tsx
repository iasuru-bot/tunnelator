import React from 'react';

interface GameControlProps {
  questions: string[];
}

const GameControl: React.FC<GameControlProps> = ({ questions }) => {
  return (
    <div>
      <h3>Questions actuelles:</h3>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameControl;
