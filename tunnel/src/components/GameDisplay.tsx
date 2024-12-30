interface Question {
  question: string;
  answered: boolean;
  points: number;
  pointsClaimed: boolean;
}

interface CardProps {
  title: string;
  questions: Question[];
}
interface RatingProps {
  answered: boolean;
  pointsClaimed: boolean;
}

const Rating: React.FC<RatingProps> = ({ answered, pointsClaimed }) => {
  // Déterminer la couleur en fonction de l'état de la question
  let ratingClass = "bg-gray-500"; // Défaut : gris

  if (answered && pointsClaimed) {
    ratingClass = "bg-green-500"; // Si répondu et points réclamés : vert
  } else if (answered) {
    ratingClass = "bg-red-500"; // Si seulement répondu : rouge
  }
  return (
    <div
      className={`w-5 h-10 border-2 border-white rounded-md ${ratingClass}`}
    />
  );
};

const Card: React.FC<CardProps> = ({ title, questions }) => {
    return (
      <div className="card p-4 bg-black text-white border-2 border-white rounded-md m-4 w-80">
        <div className="card-title text-xl mb-4">{title}</div>
        <div className="rating flex justify-between mb-4">
          {questions.map((q, index) => (
            <div key={index} className="flex flex-col items-center">
              <Rating answered={q.answered} pointsClaimed={q.pointsClaimed} />
              <span>{q.points}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default Card;
