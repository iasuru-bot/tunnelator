import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (): Socket => {
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io('http://localhost:3000'); // URL du serveur

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef.current!;
};
