import React from 'react';

interface CategorySelectorProps {
  onCategoryChange: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategoryChange }) => {
  return (
    <div>
      <button onClick={() => onCategoryChange('Catégorie 1')}>Catégorie 1</button>
      <button onClick={() => onCategoryChange('Catégorie 2')}>Catégorie 2</button>
      <button onClick={() => onCategoryChange('Catégorie 3')}>Catégorie 3</button>
    </div>
  );
};

export default CategorySelector;
