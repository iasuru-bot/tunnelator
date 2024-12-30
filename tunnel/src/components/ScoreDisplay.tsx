import React from 'react';

interface ScoreTableProps {
  scores: { [name: string]: number };
}

const ScoreDisplay: React.FC<ScoreTableProps> = ({ scores }) => {
  const sortedScores = Object.entries(scores).sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

  if (sortedScores.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666', margin: '20px 0' }}>Aucun score disponible pour l'instant.</p>;
  }

  return (
    <div style={{ overflowX: 'auto', padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <table
        style={{
          width: '90%',
          maxWidth: '600px',
          borderCollapse: 'separate',
          borderSpacing: '0',
          border: '1px solid #ddd',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: 'left',
                padding: '12px',
                backgroundColor: '#219EBC',
                color: '#fff',
                fontWeight: 'bold',
                borderTopLeftRadius: '10px',
              }}
            >
              Nom
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '12px',
                backgroundColor: '#219EBC',
                color: '#fff',
                fontWeight: 'bold',
                borderTopRightRadius: '10px',
              }}
            >
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map(([name, score], index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index === 0 ? '#FFB703' : '#fff',
                color: index === 0 ? '#023047' : '#666',
                fontWeight: index === 0 ? 'bold' : 'normal',
                borderBottom: '1px solid #ddd',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer',
                borderRadius: '10px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f3f3')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = index === 0 ? '#FFB703' : '#fff')
              }
            >
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreDisplay;
