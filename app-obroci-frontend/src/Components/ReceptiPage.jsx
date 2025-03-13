import axios from "axios";
import Recept from "./Recept";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { FaSpinner } from "react-icons/fa";

const ReceptiPage = () => {
    const [recepti, setRecepti] = useState([]); 
    const [limit, setLimit] = useState(5); 
    const [totalRecipes, setTotalRecipes] = useState(0); 
    const [loading, setLoading] = useState(true); 
    const [toastShown, setToastShown] = useState(false);
    const [preferencije, setPreferencije] = useState([]); 
    const [selectedPreferencije, setSelectedPreferencije] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(""); 

    useEffect(() => {
        setLoading(true);
        axios.get("api/recepti")
            .then((response) => {
                setRecepti(response.data.data);
                setTotalRecipes(response.data.meta.total);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
                setLoading(false);
            });

        axios.get("api/preferencije")
            .then((response) => {
                setPreferencije(response.data.data);
            });
    }, []); 

    const handlePreferenceChange = (event) => {
        const { value, checked } = event.target;
        setSelectedPreferencije((prev) => 
            checked ? [...prev, value] : prev.filter((id) => id !== value)
        );
    };

    const filteredRecepti = recepti.filter((recept) => {
        return (
            recept.naziv.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedPreferencije.length === 0 || 
                selectedPreferencije.every((pref) => {
                    console.log("Checking preference:", pref);
    
                 
                    if (pref === "1") { 
                        return recept.vegetarijanski === 1;
                    } else if (pref === "5") { 
                        return recept.bez_glutena === 1;
                    } else if (pref === "4") { 
                        return recept.bez_laktoze === 1;
                    } else if (pref === "2") { 
                        return recept.posno === 1;
                    } else if (pref === "3") {
                        return recept.veganski === 1;
                    }
                    return false;
                })
            )
        );
    });
    
    return (
        <section>
            <div className="d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "rgba(178, 246, 175, 0.8)", minHeight: "105vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Pretraži recepte..."
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <br /><br /><br />
                <div className="flex-column" style={{ borderRadius: "0rem", width: "50%" }}>
                    {loading ? (<div className="loading-container">
                    <FaSpinner className="loading-icon" />
                    <p>Učitavanje...</p> 
                    </div>) : (
                        <>
                            {filteredRecepti.slice(0, limit).map((recept) => (
                                <Recept key={recept.id} recept={recept} />
                            ))}
                            {limit >= totalRecipes && !toastShown && (
                                <>
                                    {toast.info("Učitani su svi recepti", { position: "top-center", autoClose: 3000, hideProgressBar: true })}
                                    {setToastShown(true)} 
                                </>
                            )}
                        </>
                    )}
                </div>

                <br /><br /><br /><br />
                {limit < totalRecipes && (
                    <button onClick={() => setLimit((prev) => prev + 5)} 
                        style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#66bb6a", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                        Prikaži više
                    </button>
                )}

                {window.sessionStorage.getItem("auth_token") !== null && (
                    <button type="button" className="btn btn-primary" 
                        style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#66bb6a", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", position: 'fixed', bottom: '40px', right: '40px', zIndex: 9999 }}>
                        Dodaj recept
                    </button>
                )}

                <div style={{ position: "absolute", top: "200px", left: "60px", backgroundColor: "#4CAF50", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", zIndex: 1000, maxHeight: "80vh", overflowY: "auto", color: "#fff" }}>
                    <h5 style={{ color: "#fff" }}>Preferencije</h5>
                    {preferencije.map((preferencija) => (
                        <div key={preferencija.id} className="form-check">
                            <input type="checkbox" className="form-check-input" value={preferencija.id} onChange={handlePreferenceChange} />
                            <label className="form-check-label" style={{ color: "#fff" }}>{preferencija.naziv}</label>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default ReceptiPage;
