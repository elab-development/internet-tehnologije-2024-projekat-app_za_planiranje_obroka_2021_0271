import { useState } from "react";

const Recept = ({ recept }) => {
    if (!recept || !recept.naziv || !recept.opis) {
        return <div>Učitavanje...</div>;
    }

    let skraceniOpis = recept.opis.length > 100 ? recept.opis.slice(0, 100) + "..." : recept.opis;

    const handleButtonClick = () => {
        const newTab = window.open(`/recepti/${recept.id}`, "_blank");
        if (newTab) {
            newTab.focus();
        }
    };

    return (
        <div className="overflow-hidden w-full max-w-md shadow-lg bg-[#f9f9f9]">
            <div
                className="px-3 py-2 font-semibold text-lg"
                style={{ background: "linear-gradient(to right,#5ab869,#66bb6a)" }}
            >
                {recept.naziv}
            </div>
            <div
                className="p-4"
                style={{
                    background: "linear-gradient(to right,rgb(238, 222, 168),rgb(248, 231, 175))", 
                    position: "relative", 
                }}
            >
                <p className="text-sm">{skraceniOpis}</p>

                <button
                    onClick={handleButtonClick}
                    style={{
                        position: "absolute", 
                        bottom: "10px", 
                        right: "10px",  
                        padding: "8px 16px",
                        backgroundColor: "#66bb6a",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    Detaljnije
                </button>
            </div>
        </div>
    );
};

export default Recept;