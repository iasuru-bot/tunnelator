import React, { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketContext';

const DataFetcher: React.FC = () => {
  const socket = useSocket();
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    if (socket) {
      // Écoute de l'événement 'dataResponse' du serveur
      socket.on('dataResponse', (dataList: string[]) => {
        setData(dataList);
      });

      // Envoi d'une demande de données au serveur
      socket.emit('requestData');

      // Nettoyage de l'écouteur lors du démontage
      return () => {
        socket.off('dataResponse');
      };
    }
  }, [socket]);

  return (
    <div>
      <h2>Données reçues :</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;