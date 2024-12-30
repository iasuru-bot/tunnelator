import React, { useState, useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";
import ScoreDisplay from "../components/ScoreDisplay";
import Card from "../components/GameDisplay";
import CenteredContainer from "../components/CenteredContainer";

interface Question {
  question: string;
  answered: boolean;
  points: number;
  pointsClaimed: boolean;
}

interface Category {
  questions: Question[];
  titre: string;
}

const PresenterScreen: React.FC = () => {
  const socket = useSocket();
  const [isConnected, setIsConnected] = useState(false);
  const [connectedPlayers, setConnectedPlayers] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [scores, setScores] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);

  // Function to transform data
  const transformData = (data: any): Category[] => {
    return Object.entries(data.questions).map(([category, questions]) => ({
      titre: category,
      questions: questions as Question[],
    }));
  };

  // Function for presenter login
  const handleLogin = () => {
    if (socket) {
      socket.emit("join_presenter", { name: "presenter" });
      setIsConnected(true);
    }
  };

  useEffect(() => {
    if (!socket) return;

    // Receive the list of connected players
    socket.on("player_list_update", (players: string[]) => {
      setConnectedPlayers(players);
    });

    socket.on("update_scores", (scores: any) => {
      setScores(scores.scores);
    });

    socket.on("categories", (cat: any) => {
      setCategories(transformData(cat));
    });

    // Notification of game start
    socket.on(
      "game_started",
      (data: { categories: string[]; players: string[] }) => {
        setConnectedPlayers(data.players);
        setGameStarted(true);
      }
    );

    // Receive a new question for the presenter
    socket.on("new_question", (data: { player: string; question: string }) => {
      setCurrentPlayer(data.player);
      setCurrentQuestion(data.question);
    });

    // Receive a new question for the presenter
    socket.on("game_over", (scores: any) => {
      setScores(scores.scores);
      alert("Le jeu est terminé!");
    });

    return () => {
      socket.off("player_list_update");
      socket.off("game_started");
      socket.off("new_question");
    };
  }, [socket]);

  // Fonction pour lancer le jeu
  const startGame = async () => {
    try {
      const response = await fetch("http://192.168.1.65:3000/start-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ players: connectedPlayers }),
      });

      if (!response.ok) {
        throw new Error("Failed to start the game");
      }

      const data = await response.json();
      setCategories(data.categories); // Récupération des catégories
      setGameStarted(true); // Jeu lancé
    } catch (error) {
      console.error("Error starting the game:", error);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!socket) return;
    // Send the presenter's answer to the server
    socket.emit("presenter_response", { isCorrect });
    setCurrentQuestion(null); // Reset after the answer
    setCurrentPlayer(null);
  };

  return (
    <section className="relative">
      <CenteredContainer>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 w-screen">
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4 mt-40">
                Bienvenue dans{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#377EC0] to-[#004878]">
                  Tunnel
                </span>
              </h1>
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Se connecter
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {gameStarted ? (
                <>
                  {currentQuestion ? (
                    <div className="mb-4 max-w-80">
                      <h3 className="text-xl">Question: {currentQuestion}</h3>
                      <h3 className="text-xl">Joueur: {currentPlayer}</h3>
                      <button
                        onClick={() => handleAnswer(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                      >
                        Correct
                      </button>
                      <button
                        onClick={() => handleAnswer(false)}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Incorrect
                      </button>
                    </div>
                  ) : (
                    <h3 className="text-xl mb-20">
                      En attente de la prochaine question...
                    </h3>
                  )}
                  {scores && <ScoreDisplay scores={scores} />}
                  {categories && (
                    <>
                      <h3 className="bg-black text-xl p-4 border-solid border-2 border-sky-500">
                        <i>Les Tunnels</i>
                      </h3>
                      <div className="bg-black flex flex-wrap gap-4 p-4 justify-center h-50 mt-30 border-solid border-2 border-sky-500">
                        {categories.map((category) => (
                          <Card
                            title={category.titre}
                            questions={category.questions}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <h2 className="text-2xl mb-4">Joueurs Connectés</h2>
                  <ul className="list-none p-0 mb-4">
                    {connectedPlayers.map((player, index) => (
                      <li key={index} className="mb-2">
                        {player}
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-xl">Le jeu n'a pas encore commencé.</h3>
                  <button
                    onClick={startGame}
                    style={{
                      padding: "10px 20px",
                      fontSize: "18px",
                      marginTop: "20px",
                      backgroundColor: "#023047",
                      color: "#fff",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Lancer le jeu
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </CenteredContainer>
    </section>
  );
};

export default PresenterScreen;
