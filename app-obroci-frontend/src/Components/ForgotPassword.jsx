import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); // For navigation

    const handleReset = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/forgot-password", { email });
            window.alert(response.data.message);
            
            // After successfully sending the email, navigate to the reset-password page
            navigate("/reset_password");
        } catch (error) {
            window.alert("Greška pri slanju emaila");
        }
    };

    return (
        <div 
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ background: "linear-gradient(to right,rgb(42, 162, 46),rgb(130, 200, 130))" }} 
        >
            <div 
                className="card text-center"
                style={{ 
                    width: "100%",  // Take full width
                    maxWidth: "520px",  // Slightly reduced max width
                    height: "auto",  // Auto height based on content
                    background: "linear-gradient(to bottom, #388E3C, #1B5E20)", 
                    color: "white",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    paddingBottom: "20px"  // Padding at the bottom
                }}
            >
                <div 
                    className="card-header h4" 
                    style={{ 
                        background: "linear-gradient(to right, #2E7D32, #1B5E20)", 
                        borderTopLeftRadius: "15px", 
                        borderTopRightRadius: "15px"
                    }}
                >
                    Resetovanje lozinke
                </div>
                <div className="card-body px-4">
                    <p className="card-text py-2" style={{ fontSize: "16px" }}>
                        Unesite svoju email adresu i poslaćemo vam uputstva za resetovanje lozinke.
                    </p>
                    <div className="form-outline">
                        <input 
                            type="email" 
                            id="typeEmail" 
                            className="form-control my-3" 
                            style={{ 
                                background: "#cbf0bb", 
                                color: "black", 
                                border: "none", 
                                textAlign: "center", 
                                padding: "8px",  // Reduced padding for input field
                                fontSize: "16px"  // Adjusted font size
                            }} 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <label className="form-label" htmlFor="typeEmail" style={{ color: "white", fontSize: "14px" }}>
                            Email
                        </label>
                    </div>
                    <button 
                        className="btn w-100" 
                        style={{ 
                            background: "#388E3C", 
                            color: "white", 
                            border: "none", 
                            padding: "10px",  // Reduced padding for button
                            fontSize: "14px"  // Smaller font size for the button
                        }} 
                        onClick={handleReset}
                    >
                        Resetuj lozinku
                    </button>
                    <div className="d-flex justify-content-between mt-4" style={{ fontSize: "14px" }}>
                        <Link to="/login" className="text-white text-decoration-none">Prijava</Link>
                        <Link to="/register" className="text-white text-decoration-none">Registracija</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
