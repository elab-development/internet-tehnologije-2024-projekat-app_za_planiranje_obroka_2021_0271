import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleReset = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/forgot-password", { email });
            window.alert(response.data.message);
        } catch (error) {
            window.alert("Greška pri slanju emaila");
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/reset-password", { email, token: code, sifra: newPassword });
            window.alert(response.data.message);
        } catch (error) {
            window.alert("Greška pri resetovanju lozinke");
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
                    {/* Email input */}
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

                    {/* Email code input */}
                    <div className="form-outline">
                        <input 
                            type="text" 
                            id="code" 
                            className="form-control my-3" 
                            style={{ 
                                background: "#cbf0bb", 
                                color: "black", 
                                border: "none", 
                                textAlign: "center" 
                            }} 
                            maxLength="6"  
                            value={code} 
                            onChange={(e) => setCode(e.target.value)} 
                        />
                        <label className="form-label" htmlFor="code" style={{ color: "white" }}>
                            Unesite kod iz emaila
                        </label>
                    </div>

                    {/* New password input */}
                    <div className="form-outline">
                        <input 
                            type="password" 
                            id="newPassword" 
                            className="form-control my-3" 
                            style={{ 
                                background: "#cbf0bb", 
                                color: "black", 
                                border: "none", 
                                textAlign: "center" 
                            }} 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                        />
                        <label className="form-label" htmlFor="newPassword" style={{ color: "white" }}>
                            Nova lozinka
                        </label>
                    </div>

                    {/* Submit button */}
                    <button 
                        className="btn w-100" 
                        style={{ background: "#388E3C", color: "white", border: "none" }}
                        onClick={handleSubmit}
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