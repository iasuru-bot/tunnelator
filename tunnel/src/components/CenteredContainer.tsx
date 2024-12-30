import React from 'react';

interface CenteredContainerProps {
  children: React.ReactNode;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => {
  return (
     
    <div className="relative w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default CenteredContainer;
