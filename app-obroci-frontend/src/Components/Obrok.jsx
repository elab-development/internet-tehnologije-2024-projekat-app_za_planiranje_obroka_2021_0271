import React from 'react';
import Recept from './Recept';

function Obrok({ tip, recept }) {
  return (
    <div className="mb-2 border-b pb-1">
      <strong>Tip:</strong> {tip}
      <br />
      <strong>Recept:</strong>
      <Recept recept={recept} />
    </div>
  );
}

export default Obrok;