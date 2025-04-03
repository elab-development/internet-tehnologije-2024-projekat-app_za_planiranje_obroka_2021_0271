import axios from "axios";
import Recept from "./Recept";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Preferencije from "./Preferencije";

const ReceptiPage = () => {
    const [recepti, setRecepti] = useState([]);
    const [loading, setLoading] = useState(true);
    const [preferencije, setPreferencije] = useState([]);
    const [selectedPreferencije, setSelectedPreferencije] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const receptiPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllRecepti = async () => {
            try {
                setLoading(true);
                const all = [];
                let page = 1;
                let lastPage = 1;

                do {
                    const res = await axios.get(`api/recepti?page=${page}`);
                    all.push(...res.data.data);
                    lastPage = res.data.meta.last_page;
                    page++;
                } while (page <= lastPage);

                setRecepti(all);
                setLoading(false);
            } catch (err) {
                console.error("Greška prilikom dohvata recepata:", err);
                setLoading(false);
            }
        };

        fetchAllRecepti();

        axios.get("api/preferencije")
            .then((res) => setPreferencije(res.data.data));
    }, []);

    const handlePreferenceChange = (event) => {
        const { value, checked } = event.target;
        setSelectedPreferencije((prev) =>
            checked ? [...prev, value] : prev.filter((id) => id !== value)
        );
        setCurrentPage(1);
    };

    const filteredRecepti = recepti.filter((recept) => {
        return (
            recept.naziv.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedPreferencije.length === 0 ||
                selectedPreferencije.every((pref) => {
                    if (pref === "1") return recept.vegetarijanski === 1;
                    if (pref === "5") return recept.bez_glutena === 1;
                    if (pref === "4") return recept.bez_laktoze === 1;
                    if (pref === "2") return recept.posno === 1;
                    if (pref === "3") return recept.veganski === 1;
                    return false;
                }))
        );
    });

    const totalPages = Math.ceil(filteredRecepti.length / receptiPerPage);
    const paginatedRecepti = filteredRecepti.slice(
        (currentPage - 1) * receptiPerPage,
        currentPage * receptiPerPage
    );

    return (
        <section>
            <div className="d-flex align-items-center"
                style={{ backgroundColor: "rgba(178, 246, 175, 0.8)", minHeight: "105vh", width: "100%", flexDirection: "column" }}>

                <div className="container col-md-3 mt-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pretraži recepte..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <br /><br /><br />
                <div className="flex-column" style={{ borderRadius: "0rem", width: "50%" }}>
                    {loading ? (
                        <div className="loading-container text-center">
                            <FaSpinner className="loading-icon" />
                            <p>Učitavanje...</p>
                        </div>
                    ) : (
                        <>
                            {paginatedRecepti.length > 0 ? (
                                paginatedRecepti.map((recept) => (
                                    <Recept key={recept.id} recept={recept} />
                                ))
                            ) : (
                                <p className="text-center">Nema recepata koji odgovaraju filterima.</p>
                            )}
                        </>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="pagination mt-4 mb-5">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`btn ${currentPage === i + 1 ? 'btn-success' : 'btn-outline-success'} mx-1`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
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
                    <Preferencije
                        preferencije={preferencije}
                        handlePreferenceChange={handlePreferenceChange}
                        positionStyle={{ position: "absolute", top: "200px", left: "60px" }}
                        title={"Preferencije"}
                        textColor={"#fff"}
                    />
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default ReceptiPage;
