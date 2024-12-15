// src/components/CategoryCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="category-card">
      <h3>{category}</h3>
      <Link to="/player">Jouer</Link>
    </div>
  );
};
