import axios from "axios";
import Recept from "./Recept";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Preferencije from "./Preferencije";

const ReceptiPage = () => {
    const [recepti, setRecepti] = useState([]); 
    const [limit, setLimit] = useState(5); 
    const [totalRecipes, setTotalRecipes] = useState(0); 
    const [loading, setLoading] = useState(true); 
    const [toastShown, setToastShown] = useState(false);
    const [preferencije, setPreferencije] = useState([]); 
    const [selectedPreferencije, setSelectedPreferencije] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const navigate = useNavigate();

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
            <div className="d-flex justify-content-center align-items-center sticky-search"
                style={{ backgroundColor: "rgba(178, 246, 175, 0.8)", minHeight: "105vh", width: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Pretraži recepte..."
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)   
                                }
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
                        style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#66bb6a", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "35px" }}>
                        Prikaži više
                    </button>
                )}

            {window.sessionStorage.getItem("auth_token") !== null && (
            <button 
                type="button" 
                className="btn btn-primary" 
                style={{ 
                    padding: "10px 20px", 
                    fontSize: "16px", 
                    backgroundColor: "#66bb6a", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "5px", 
                    cursor: "pointer", 
                    position: 'fixed', 
                    bottom: '40px', 
                    right: '40px', 
                    zIndex: 9999 
                }}
                onClick={() => navigate('/dodajRecept')}
            >
                Dodaj recept
            </button>
            )}
            <div>
                <Preferencije preferencije={preferencije} handlePreferenceChange={handlePreferenceChange} positionStyle={{ position: "absolute", top: "200px", left: "60px" }} title={"Preferencije"} />
            </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default ReceptiPage;
