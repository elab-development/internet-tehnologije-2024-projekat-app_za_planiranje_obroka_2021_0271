import React from 'react';
import { useNavigate } from 'react-router-dom';

function Obrok({ tip, recept }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (recept?.id) {
      navigate(`/recepti/${recept.id}`);
    }
  };

  if (!recept) return null;

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer overflow-hidden shadow-md hover:shadow-lg transition-transform duration-200"
      style={{
        background: 'linear-gradient(to right, rgb(238, 222, 168), rgb(248, 231, 175))',
        borderRadius: '12px',
        padding: '10px 15px',
        margin: '8px auto',
        maxWidth: '280px',
        fontSize: '0.9rem',
        fontWeight: '500',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <div>Tip: {tip}</div>
      <div>Recept: {recept.naziv}</div>
    </div>
  );
}

export default Obrok;
