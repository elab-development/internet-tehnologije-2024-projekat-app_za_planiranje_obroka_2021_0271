import React from "react";

const Preferencije = ({ preferencije, handlePreferenceChange, positionStyle, title, textColor, checkedPreferencije = []}) => {
    return (
        <div style={{ 
            backgroundColor: "#66bb6a", 
            padding: "20px", 
            borderRadius: "8px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
            zIndex: 1000, 
            overflowY: "auto", 
            color: textColor,
            ...positionStyle
        }}>
            <h5 style={{ color: textColor}}>{title}</h5>
            {preferencije.map((preferencija) => (
                <div key={preferencija.id} className="form-check">
                    <input 
                        type="checkbox" 
                        //checked = {checkedPreferencije.includes(preferencija.id)}
                        defaultChecked={checkedPreferencije.includes(preferencija.id)}
                        className="form-check-input" 
                        value={preferencija.id} 
                        onChange={handlePreferenceChange} 
                    />
                    <label className="form-check-label" style={{ color: textColor }}>
                        {preferencija.naziv}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Preferencije;
