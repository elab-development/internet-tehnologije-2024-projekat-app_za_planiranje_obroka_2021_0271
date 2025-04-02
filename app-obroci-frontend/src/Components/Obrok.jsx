import React from "react";
import { useNavigate } from "react-router-dom";

const Obrok = ({ tip, recept }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recepti/${recept.id}`, {
      state: { fromObroci: true },
    });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: "#fbe9a9",
        borderRadius: "8px",
        padding: "8px",
        cursor: "pointer",
      }}
    >
      <p>
        <strong>Tip:</strong> {tip}
      </p>
      <p>
        <strong>Recept:</strong> {recept.naziv}
      </p>
    </div>
  );
};

export default Obrok;
