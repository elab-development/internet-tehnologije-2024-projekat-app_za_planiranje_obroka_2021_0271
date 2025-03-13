import { useState } from "react";
import "../css/Recept.css"; 
import { FaSpinner } from "react-icons/fa";

const Recept = ({ recept }) => {
    if (!recept || !recept.naziv || !recept.opis) {
        return (
            <div className="loading-container">
                <FaSpinner className="loading-icon" /> 
            </div>
        );
    }

    let skraceniOpis = recept.opis.length > 100 ? recept.opis.slice(0, 100) + "..." : recept.opis;

    const handleButtonClick = () => {
        const newTab = window.open(`/recepti/${recept.id}`, "_blank");
        if (newTab) {
            newTab.focus();
        }
    };

    return (
        <div className="recept-container overflow-hidden w-full max-w-md shadow-lg bg-[#f9f9f9]" style={{ position: "relative", margin: "10px 0" }}>
            <div className="px-3 py-2 font-semibold text-lg" style={{ background: "linear-gradient(to right,#5ab869,#66bb6a)" }}>
                {recept.naziv}
            </div>
            <div className="p-4 flex flex-col gap-4" style={{ background: "linear-gradient(to right,rgb(238, 222, 168),rgb(248, 231, 175))", position: "relative" }}>
                <p className="text-sm px-5">{skraceniOpis}</p>

                <button
                    onClick={handleButtonClick}
                    className="detaljnije-btn"
                >
                    Detaljnije
                </button>
            </div>
        </div>
    );
};

export default Recept;