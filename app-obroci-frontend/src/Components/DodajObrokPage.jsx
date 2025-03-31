import React, { useState, useEffect } from "react";
import axios from "axios";
import Recept from "./Recept";
import { FaSpinner } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function DodajObrokPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMeal, setSelectedMeal] = useState("");
    const mealOptions = ["dorucak", "rucak", "vecera", "uzina"];
    const [recepti, setRecepti] = useState([]);
    const [selectedRecept, setSelectedRecept] = useState([]);
    const [totalRecipes, setTotalRecipes] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("");
    const [usePreferencesFilter, setUsePreferencesFilter] = useState(false);

    useEffect(() => {
        if (location.state?.selectedDate) {
            setSelectedDate(location.state.selectedDate);
        }
    }, [location]);

    const handleReceptClick = (recept) => {
        setSelectedRecept(recept);
    };

    useEffect(() => {
        setLoading(true);
        const route = usePreferencesFilter ? "api/pretrazi-recepte" : "api/recepti";

        const headers = usePreferencesFilter
            ? {
                  Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
                  Accept: "application/json",
              }
            : {};

        axios
            .get(route, { headers })
            .then((response) => {
                const data = usePreferencesFilter ? response.data : response.data.data;
                const total = usePreferencesFilter ? 0 : response.data.meta.total;
                setRecepti(data);
                setTotalRecipes(total);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
                setLoading(false);
            });
    }, [usePreferencesFilter]);

    const handleCheckboxChange = (event) => {
        setUsePreferencesFilter(event.target.checked);
    };

    const addObrok = () => {
        if (!selectedMeal || !selectedDate || !selectedRecept) {
            alert("Molimo vas da izaberete tip obroka, datum i recept.");
            return;
        }

        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDateObj = new Date(selectedDate).setHours(0, 0, 0, 0);

        if (selectedDateObj < today) {
            alert("Ne možete dodati obrok za datum u prošlosti.");
            return;
        }

        const korisnikId = window.sessionStorage.getItem("id");

        if (!korisnikId) {
            alert("Korisnički ID nije pronađen. Molimo vas da se prijavite ponovo.");
            return;
        }

        axios
            .post(
                "api/obroci",
                {
                    datum: selectedDate,
                    tip: selectedMeal,
                    korisnik_id: korisnikId,
                    recept_id: selectedRecept.id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
                    },
                }
            )
            .then(() => {
                alert("Obrok je uspešno dodat");

                navigate("/obroci", {
                    state: {
                        newMeal: {
                            date: selectedDate,
                            type: selectedMeal,
                            name: selectedRecept.naziv,
                        },
                    },
                });
            })
            .catch((error) => {
                console.error("Greška:", error);
                const errorMessage =
                    error.response?.data?.message || "Došlo je do greške pri dodavanju obroka.";
                alert(errorMessage);
            });
    };

    return (
        <section className="d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(178, 246, 175, 0.8)" }}>
            <div className="card d-flex flex-column align-items-center justify-content-center"
                style={{ borderRadius: "1rem", width: "55vw", height: "auto", background: "rgb(204, 255, 255)", marginTop: "5%", marginBottom: "5%" }}
            >
                <div className="col-md-6 d-flex flex-column p-3 text-center align-items-center justify-content-center">
                    <h3 className="mb-3 w-100" style={{ marginTop: "8%" }}>Dodaj obrok</h3>

                    <label className="form-label" style={{ marginTop: "8%" }}>Izaberi tip obroka</label>
                    <select
                        className="form-select"
                        value={selectedMeal}
                        onChange={(e) => setSelectedMeal(e.target.value)}
                    >
                        <option value="" disabled hidden>Izaberite...</option>
                        {mealOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>

                    <div className="d-flex flex-column align-items-start" style={{ marginTop: "5%", marginBottom: "5%", marginRight: "10%" }}>
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="filterByPreferences"
                                checked={usePreferencesFilter}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="filterByPreferences">
                                Pretraži recepte samo po
                                <a href="/profil" style={{ marginLeft: "5px", textDecoration: "underline", color: "blue" }}>
                                    mojim preferencijama i alergijama
                                </a>
                            </label>
                        </div>
                    </div>

                    <div className="align-items-center justify-content-center">
                        <label className="form-label">
                            Datum obroka
                        </label>
                        <input
                            type=""
                            className="form-control text-center"
                            value={new Date(selectedDate)
                            .toLocaleDateString("sr-RS")
                            .replace(/\.$/, "")        
                            .replaceAll(".", "/")
                            .replaceAll(" ", "")
                            .replaceAll("/", ".")}
                            disabled
                            style={{ marginBottom: "20%", maxWidth: "132px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "5%" }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pretražite recepte..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex-column" style={{ width: "100%", marginBottom: "8%" }}>
                        {loading ? (
                            <div>
                                <FaSpinner className="loading-icon" />
                                <p>Učitavanje...</p>
                            </div>
                        ) : (
                            recepti
                                .filter(recept => recept.naziv.toLowerCase().includes(searchTerm.toLowerCase()))
                                .slice(0, 5)
                                .map((recept) => (
                                    <div
                                        key={recept.id}
                                        onClick={() => handleReceptClick(recept)}
                                        style={{ cursor: "pointer", background: selectedRecept.id === recept.id ? "#c8e6c9" : "white" }}
                                    >
                                        <Recept recept={recept} />
                                    </div>
                                ))
                        )}
                    </div>

                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <label className="form-label">Odabrani recept:</label>
                        <div
                            className="p-2 text-center"
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                marginBottom: "15%",
                                backgroundColor: "#f0f0f0",
                                borderRadius: "5px",
                                border: "2px solid #ccc",
                            }}
                        >
                            {selectedRecept?.naziv || "Nije odabran recept"}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#66bb6a", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "8%" }}
                        onClick={addObrok}
                    >
                        Dodaj obrok
                    </button>
                </div>
            </div>
        </section>
    );
}

export default DodajObrokPage;
