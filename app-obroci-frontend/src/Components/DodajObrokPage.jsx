import React, { useState, useEffect } from "react";
import axios from "axios";
import Recept from "./Recept";
import { FaSpinner } from "react-icons/fa";
import { useLocation, useNavigate, Link } from "react-router-dom";

function DodajObrokPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMeal, setSelectedMeal] = useState("");
    const mealOptions = ["dorucak", "rucak", "vecera", "uzina"];
    const [recepti, setRecepti] = useState([]);
    const [selectedRecept, setSelectedRecept] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [usePreferencesFilter, setUsePreferencesFilter] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (location.state?.selectedDate) {
            setSelectedDate(location.state.selectedDate);
        }
    }, [location]);

    useEffect(() => {
        const fetchAllRecepti = async () => {
            try {
                setLoading(true);
                const route = usePreferencesFilter ? "api/pretrazi-recepte" : "api/recepti";
                const headers = usePreferencesFilter
                    ? { Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}` }
                    : {};

                let allRecepti = [];
                let page = 1;
                let lastPage = 1;

                do {
                    const res = await axios.get(`${route}?page=${page}`, { headers });
                    const data = usePreferencesFilter ? res.data : res.data.data;
                    const meta = usePreferencesFilter ? null : res.data.meta;
                    lastPage = meta?.last_page || 1;
                    allRecepti.push(...data);
                    page++;
                } while (page <= lastPage);

                setRecepti(allRecepti);
                setLoading(false);
            } catch (error) {
                console.error("Greška prilikom dohvata svih recepata:", error);
                setLoading(false);
            }
        };

        fetchAllRecepti();
    }, [usePreferencesFilter]);

    const handleReceptClick = (recept) => setSelectedRecept(recept);
    const handleCheckboxChange = (e) => setUsePreferencesFilter(e.target.checked);

    const addObrok = () => {
        if (!selectedMeal || !selectedDate || !selectedRecept) {
            alert("Molimo vas da izaberete tip obroka, datum i recept.");
            return;
        }

        const korisnikId = sessionStorage.getItem("id");
        if (!korisnikId) return alert("Niste prijavljeni.");

        axios.post("api/obroci", {
            datum: selectedDate,
            tip: selectedMeal,
            korisnik_id: korisnikId,
            recept_id: selectedRecept.id,
        }, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` }
        })
        .then(() => {
            alert("Obrok je uspešno dodat");
            navigate("/obroci");
        })
        .catch((err) => {
            console.error("Greška:", err);
            alert("Došlo je do greške pri dodavanju obroka.");
        });
    };

    const filteredRecepti = recepti.filter(r =>
        r.naziv.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="d-flex align-items-center justify-content-center flex-column" style={{ backgroundColor: "rgba(178, 246, 175, 0.8)", minHeight: "100vh" }}>
            <div style={{ width: "55vw", textAlign: "left", marginBottom: "1rem", fontSize: "0.9rem" }}>
                <Link to="/">Početna</Link> &gt; <Link to="/obroci">Obroci</Link> &gt; <span>Dodaj obrok</span>
            </div>
            <div className="card d-flex flex-column align-items-center justify-content-center"
                style={{ borderRadius: "1rem", width: "55vw", background: "rgb(204, 255, 255)", marginBottom: "5%" }}>

                <div className="col-md-6 d-flex flex-column p-3 text-center align-items-center justify-content-center">
                    <h3 className="mb-3 w-100" style={{ marginTop: "2%" }}>Dodaj obrok</h3>

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

                    <div className="form-check mt-4">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="filterByPreferences"
                            checked={usePreferencesFilter}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="filterByPreferences">
                            Pretraži recepte po mojim <Link to="/profil">preferencijama</Link>
                        </label>
                    </div>

                    <label className="form-label mt-4">Datum obroka</label>
                    <input
                        type="text"
                        className="form-control text-center"
                        value={selectedDate ? new Date(selectedDate).toLocaleDateString("sr-RS") : ""}
                        disabled
                    />

                    <input
                        type="text"
                        className="form-control mt-4"
                        placeholder="Pretraži recepte..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="w-100 mt-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {loading ? (
                            <div className="text-center"><FaSpinner className="loading-icon" /> Učitavanje...</div>
                        ) : (
                            filteredRecepti.map((recept) => (
                                <div
                                    key={recept.id}
                                    onClick={() => handleReceptClick(recept)}
                                    style={{ cursor: "pointer", background: selectedRecept?.id === recept.id ? "#c8e6c9" : "white" }}
                                >
                                    <Recept recept={recept} />
                                </div>
                            ))
                        )}
                    </div>

                    <label className="form-label mt-4">Odabrani recept:</label>
                    <div className="p-2 text-center mb-4" style={{ backgroundColor: "#f0f0f0", borderRadius: "5px", border: "2px solid #ccc" }}>
                        {selectedRecept?.naziv || "Nije odabran recept"}
                    </div>

                    <button className="btn btn-success mb-4" onClick={addObrok}>
                        Dodaj obrok
                    </button>
                </div>
            </div>
        </section>
    );
}

export default DodajObrokPage;
