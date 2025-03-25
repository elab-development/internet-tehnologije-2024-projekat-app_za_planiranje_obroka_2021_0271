import React, { useState, useEffect } from "react";
import axios from "axios";
import Preferencije from "./Preferencije";
import { CgAdd } from "react-icons/cg";
import { CiCircleMinus } from "react-icons/ci";

function DodajReceptPage() {
    const [preferencije, setPreferencije] = useState([]);
    const [selectedPreferencije, setSelectedPreferencije] = useState([]);
    const [namirnice, setNamirnice] = useState([]);
    const [selectedNamirnice, setSelectedNamirnice] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const authToken = sessionStorage.getItem("auth_token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prefResponse = await axios.get("api/preferencije", {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setPreferencije(prefResponse.data.data);

                const namirniceResponse = await axios.get("api/namirnice", {
                    headers: { Authorization: `Bearer ${authToken}` },
                });

                setNamirnice(namirniceResponse.data.namirnice);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [authToken]);

    const addRecept = async () => {
        const nazivRecepta = document.querySelector('input[placeholder="Naziv"]').value.trim();
        const opisRecepta = document.querySelector('textarea[placeholder="Opis"]').value.trim();

        if (nazivRecepta.length < 2 || nazivRecepta.length > 255) {
            alert("Naziv recepta mora biti između 2 i 255 karaktera.");
            return;
        }
        if (opisRecepta.length > 1000) {
            alert("Opis recepta ne može biti duži od 1.000 karaktera.");
            return;
        }
        if (selectedNamirnice.some(n => !/^[0-9]+$/.test(n.kolicina.trim()))) {
            alert("Sva polja 'Količina' moraju biti celi brojevi.");
            return;
        }
        console.log(selectedPreferencije);
        try {
            const receptData = {
                naziv: nazivRecepta,
                opis: opisRecepta,
                vegetarijanski: selectedPreferencije.includes("1") ? 1 : 0,
                posno: selectedPreferencije.includes("2") ? 1 : 0,
                veganski: selectedPreferencije.includes("3") ? 1 : 0,
                bez_laktoze: selectedPreferencije.includes("4") ? 1 : 0,
                bez_glutena: selectedPreferencije.includes("5") ? 1 : 0,
            };

            const receptResponse = await axios.post("api/recepti", receptData, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            const receptId = receptResponse.data[1].id;

            await Promise.all(selectedNamirnice.map(namirnica => {
                return axios.post("/api/namirnica_recept", {
                    recept_id: receptId,
                    namirnica_id: namirnica.id,
                    kolicina: parseInt(namirnica.kolicina, 10)
                }, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
            }));
            
            alert("Recept je uspešno dodat!");
        } catch (error) {
            console.error("Greška prilikom dodavanja recepta:", error);

            console.log(namirnice);
            console.log(error);
            console.log("Token:", authToken);

            alert("Došlo je do greške pri dodavanju recepta.");
        }
    };

    const handlePreferenceChange = (event) => {
        const { value, checked } = event.target;
        setSelectedPreferencije((prev) =>
            checked ? [...prev, value] : prev.filter((id) => id !== value)
        );
    };

    const addNamirnica = (namirnica) => {
        if (!selectedNamirnice.some((item) => item.id === namirnica.id)) {
            setSelectedNamirnice((prev) => [...prev, { ...namirnica, kolicina: "" }]);
        }
    };

    const removeNamirnica = (id) => {
        setSelectedNamirnice((prev) => prev.filter((item) => item.id !== id));
    };

    const updateKolicina = (id, newValue) => {
        if (parseInt(newValue, 10) > 5000) {
            alert("Količina ne može biti veća od 5000 grama.");
            return;
        }
        setSelectedNamirnice((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, kolicina: newValue } : item
            )
        );
    };

    const filteredNamirnice = namirnice.filter(namirnica => 
        namirnica.naziv.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return ( 
        <section className="d-flex align-items-center justify-content-center text-center" 
        style={{ backgroundColor: "rgba(178, 246, 175, 0.8)" }}>
            <div className="card d-flex flex-column align-items-center justify-content-center" 
                style={{ 
                    borderRadius: "1rem", 
                    width: "55vw",  
                    height: "auto", 
                    background: "rgb(204, 255, 255)",
                    marginTop: "5%",
                    marginBottom: "5%"
                }}>
               
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-3 text-center" style={{ }}>
                <h3 className="mb-3" style={{marginTop: "7%"}}>Dodaj recept</h3>

                <div className="mb-3 w-100" style={{marginTop: "4%"}}>
                    <label className="form-label">Naziv recepta</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Naziv" 
                        style={{ minHeight: "0vh", maxHeight: "6vh" }}
                    />
                </div>

                <div className="mb-3 w-100">
                    <label className="form-label">Opis recepta</label>
                    <textarea 
                        className="form-control" 
                        rows="5" 
                        placeholder="Opis"
                        style={{ minHeight: "0vh", maxHeight: "20vh", resize: "vertical" }}
                    />
                </div>

                    <div className="w-100 mt-3" style={{  }}>
                    <h5>Dodaj namirnice</h5>
                    <div style={{ minHeight: "0vh", maxHeight: "25vh", overflowY: "auto", marginBottom: "50px" }}>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Pretraži namirnice"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredNamirnice.map((namirnica, index) => (
                                    <tr key={index}>
                                        <td>{namirnica.naziv}</td>
                                        <td>
                                            <CgAdd style={{ cursor: "pointer" }} onClick={() => addNamirnica(namirnica)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>

                        <h5>Namirnice za moj recept</h5>
                        <div style={{ minHeight: "0vh", maxHeight: "25vh", overflowY: "auto", marginBottom: "65px" }}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Naziv</th>
                                        <th>Količina (g)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedNamirnice.map((namirnica, index) => (
                                        <tr key={index}>
                                            <td>{namirnica.naziv}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={namirnica.kolicina}
                                                    onChange={(e) => updateKolicina(namirnica.id, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <CiCircleMinus style={{ cursor: "pointer" }} onClick={() => removeNamirnica(namirnica.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="d-md-block align-items-center justify-content-center">
                    <Preferencije preferencije={preferencije} handlePreferenceChange={handlePreferenceChange} title={"Karakteristike"} positionStyle={{ 
                        position: "relative",
                        top: "73.25%",
                        minHeight: "25vh", 
                        maxHeight: "25vh",
                        textAlign: "left", 
                        minWidth: "25vw",
                        maxWidth: "25vw" }}  textColor={"#fff"}/>
                    </div><br/>
                    <br/>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#66bb6a", border: "none", borderRadius: "5px", cursor: "pointer", position: 'relative', marginBottom: "6%" }}
                        onClick={addRecept}
                    >
                        Dodaj recept
                    </button>
                </div>
            </div>
            
        </section>
    );
}

export default DodajReceptPage;
