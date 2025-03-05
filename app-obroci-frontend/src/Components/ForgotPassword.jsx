import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); // Dodato za navigaciju

    const handleReset = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/forgot-password", { email });
            window.alert(response.data.message);
            
            // Nakon uspešnog slanja emaila, preusmeri korisnika na reset-password stranicu
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
                    width: "520px",  
                    height: "36vh",  
                    background: "linear-gradient(to bottom, #388E3C, #1B5E20)", 
                    color: "white",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"
                }}
            >
                <div 
                    className="card-header h5" 
                    style={{ 
                        background: "linear-gradient(to right, #2E7D32, #1B5E20)", 
                        borderTopLeftRadius: "15px", 
                        borderTopRightRadius: "15px"
                    }}
                >
                    Resetovanje lozinke
                </div>
                <div className="card-body px-4">
                    <p className="card-text py-2">
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
                                textAlign: "center" 
                            }} 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <label className="form-label" htmlFor="typeEmail" style={{ color: "white" }}>
                            Email
                        </label>
                    </div>
                    <button 
                        className="btn w-100" 
                        style={{ background: "#388E3C", color: "white", border: "none" }}
                        onClick={handleReset}
                    >
                        Resetuj lozinku
                    </button>
                    <div className="d-flex justify-content-between mt-4">
                        <Link to="/login" className="text-white text-decoration-none">Prijava</Link>
                        <Link to="/register" className="text-white text-decoration-none">Registracija</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;