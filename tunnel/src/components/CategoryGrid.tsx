// src/components/CategoryGrid.tsx
import React, { useEffect, useState } from 'react';
import { CategoryCard } from './CategoryCard';
import { useSocket } from '../contexts/SocketContext';

export const CategoryGrid: React.FC = () => {
  const socket = useSocket();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (socket) {
      socket.emit('getCategories'); // Envoie une demande pour obtenir les catégories
      socket.on('categories', (categoriesList: string[]) => {
        setCategories(categoriesList);
      });
    }
  }, [socket]);

  return (
    <div className="category-grid">
      {categories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
    </div>
  );
};
