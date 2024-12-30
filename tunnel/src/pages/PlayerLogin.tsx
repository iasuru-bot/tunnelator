import React, { useState, useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";
import Loader from "../components/Loader";
import CenteredContainer from "../components/CenteredContainer";

const PlayerLogin: React.FC = () => {
  const socket = useSocket();
  const [playerName, setPlayerName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("correct_answer", (question: string) => {
      setCurrentQuestion(question);
    });

    socket.on("your_turn", (data: { categories: string[] }) => {
      setCategories(data.categories);
    });

    return () => {
      socket.off("correct_answer");
      socket.off("your_turn");
    };
  }, [socket]);

  const handleLogin = () => {
    if (socket && playerName.trim() !== "") {
      socket.emit("join", { name: playerName });
      setIsConnected(true);
    }
  };

  const handleCategorySelect = (category: string) => {
    if (!socket) return;
    socket.emit("category_chosen", { category });
    setCategories([]);
  };

  const handleContinue = (wantsToContinue: boolean) => {
    if (!socket) return;
    socket.emit("player_decision", { wantsToContinue });
    setCurrentQuestion(null);
  };

  return (
    <section className="relative">
      <CenteredContainer>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 w-screen">
          <h1 className="absolute top-10 text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4 mt-40">
            Bienvenue dans{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#377EC0] to-[#004878]">
              Tunnel
            </span>
          </h1>
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Entrez votre nom"
                className="mt-4 mb-2 p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Se connecter
              </button>
            </div>
          ) : currentQuestion ? (
            <div>
              <h2 className="text-xl mb-4">Bonne réponse !</h2>
              <button
                onClick={() => handleContinue(true)}
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
              >
                Continuer
              </button>
              <button
                onClick={() => handleContinue(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Arrêter
              </button>
            </div>
          ) : categories.length > 0 ? (
            <div>
              <h2 className="text-xl mb-4">Choisissez une catégorie :</h2>
              <ul className="list-none p-0">
                {categories.map((category, index) => (
                  <li key={index} className="mb-2">
                    <button
                      onClick={() => handleCategorySelect(category)}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <h2 className="text-xl mb-4">Attends ton tour</h2>
              <Loader />
            </>
          )}
        </div>
      </CenteredContainer>
    </section>
  );
};

export default PlayerLogin;
