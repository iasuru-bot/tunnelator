import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

// Créer un contexte pour le socket
const SocketContext = createContext<Socket | null>(null);

// Hook personnalisé pour accéder au socket
export const useSocket = () => {
  return useContext(SocketContext);
};

// Composant fournisseur pour le contexte
interface SocketProviderProps {
  children: ReactNode; // Déclare le type de la prop children
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  // État pour stocker le socket
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Créer une nouvelle connexion WebSocket
    const newSocket = io('http://192.168.1.65:3000'); // Remplace avec l'URL de ton serveur WebSocket
    setSocket(newSocket);

    // Fonction de nettoyage : Fermer la connexion lorsque le composant est démonté
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []); // Le tableau vide [] signifie que cet effet se lance une seule fois à l'initialisation

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
