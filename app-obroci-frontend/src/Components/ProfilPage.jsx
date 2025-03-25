import React, { useEffect, useState } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineReconciliation } from "react-icons/ai";
import { MdOutlineNoFood } from "react-icons/md";
import Preferencije from "./Preferencije";
import { ToastContainer, toast } from "react-toastify";  // Uvoz Toastify
import "react-toastify/dist/ReactToastify.css";  // Import stilova za Toastify
import { CgAdd } from "react-icons/cg";
import { CiCircleMinus } from "react-icons/ci";
import { Link } from "react-router-dom";


function ProfilPage() {
    const [korisnik, setKorisnik] = useState(null);
    const [korisnikCopy, setKorisnikCopy] = useState(null);
    const [selectedSection, setSelectedSection] = useState("profil");
    const [preferencije, setPreferencije] = useState([]);
    const [selectedPreferencije, setSelectedPreferencije] = useState([]);  // State za selektovane preferencije kao niz
    const [korisnikPreferencije, setKorisnikPreferencije] =  useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [namirnice, setNamirnice] = useState([]);
    const [selectedNamirnice, setSelectedNamirnice] = useState([]);
    const [korisnikAlergije, setKorisnikAlergije] =  useState([]);;


    const addNamirnica = (namirnica) => {
        if (!selectedNamirnice.some((item) => item.id === namirnica.id)) {
            setSelectedNamirnice((prev) => [...prev, { ...namirnica, kolicina: "" }]);
        }
    };


    const removeNamirnica = (id) => {
        setSelectedNamirnice((prev) => prev.filter((item) => item.id !== id));
    };

    const filteredNamirnice = namirnice.filter(namirnica => 
        namirnica.naziv.toLowerCase().includes(searchTerm.toLowerCase())
    );


    useEffect(() => {
        setKorisnikCopy(korisnik);
    }, [korisnik]);


    useEffect(() => {
        if (korisnikPreferencije.length > 0) {
            setSelectedPreferencije(korisnikPreferencije);
        }
    }, [korisnikPreferencije]);

    useEffect(() => {
        if (korisnikAlergije.length > 0) {
            setSelectedNamirnice(korisnikAlergije);
        }
    }, [korisnikAlergije]);


    const handlePreferenceChange = (event) => {
        const preferencijaId = parseInt(event.target.value, 10);
        const isChecked = event.target.checked;  // Provera da li je checkbox čekiran
        
    
        setSelectedPreferencije((prevSelected) => {
            if (isChecked) {
                // Ako je čekiran, dodajemo preferenciju u niz
                return [...prevSelected, preferencijaId];
            } else {
                // Ako nije čekiran, uklanjamo preferenciju iz niza
                return prevSelected.filter(id => id !== preferencijaId);
            }
        });
       
    };

    //Ova ovde je za texBoxove u promeniPodatke
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setKorisnikCopy(prevState => ({
            ...prevState,
            [name]: value, // ažurira samo polje koje je promenjeno
        }));
    };

    //Ova je za submitovanje forme 
    const handleSubmit = (e) => {
        e.preventDefault();  // Sprečava reload stranice pri submitu
        const korisnikId = window.sessionStorage.getItem("id");
        const authToken = window.sessionStorage.getItem("auth_token");
        // Axios PUT zahtev za update
        

        axios.put(`/api/korisnici/${korisnikId}`, {
            ime: korisnikCopy.ime,
            prezime: korisnikCopy.prezime,
            email: korisnikCopy.email,
            korisnicko_ime: korisnikCopy.korisnicko_ime,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,  // Dodajemo Authorization header sa tokenom
            }
        })
        .then((response) => {
            console.log("Uspešan update:", response.data);
            toast.success("Uspešno promenjeni podaci!", {
                position: "top-center",
                hideProgressBar: true,
                autoClose: 5000,
            });
        })
        .catch((error) => {
            console.error("Greška prilikom ažuriranja:", error);
            toast.error("Došlo je do greške pri ažuriranju podataka.", {
                position: "top-center",
                hideProgressBar: true,
                autoClose: 5000,
            });
        });
    };

    const handleSaveNamirnice = () => {
        const korisnikId = window.sessionStorage.getItem("id");
        const authToken = window.sessionStorage.getItem("auth_token");

        if(korisnikAlergije.length>0 || selectedNamirnice.length === 0 ){
            axios.delete(`/api/korisnici/${korisnikId}/alergije`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,  
                },
            })
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error("Greška pri brisanju alergija:", error);
            });
        }
        

        const requests = selectedNamirnice.map((namirnica) =>
            axios.post(
                "/api/alergije",
                {
                    korisnik_id: korisnikId,
                    namirnica_id: namirnica.id, // Ako je selectedNamirnice niz objekata
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            )
        );
    
        Promise.all(requests)
            .then(() => {
                toast.success("Uspešno sačuvane alergije!", {
                    position: "top-center",
                    hideProgressBar: true,
                    autoClose: 5000,
                });
            })
            .catch((error) => {
                console.error("Greška pri čuvanju alergija:", error);
                toast.error("Došlo je do greške pri čuvanju alergija.", {
                    position: "top-center",
                    hideProgressBar: true,
                    autoClose: 5000,
                });
            });

    };



    const handleSavePreferences = () => {
        const korisnikId = window.sessionStorage.getItem("id");
        const authToken = window.sessionStorage.getItem("auth_token");


     

        if(selectedPreferencije.length === 0 || korisnikPreferencije.length > 0){
          
            axios.delete(`/api/korisnici/${korisnikId}/preferencije`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,  // Ako koristiš Bearer token za autorizaciju
                },
            })
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error("Greška pri brisanju preferencija:", error);
            });  
        }
     

        // Iteriramo kroz sve selektovane preferencije i šaljemo ih jednu po jednu
        selectedPreferencije.forEach((preferencijaId) => {
            axios.post(
                "/api/korisnik_preferencije",
                {
                    korisnik_id: korisnikId,
                    preferencija_id: preferencijaId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            )
            .then((response) => {
                console.log("Preferencija je uspešno sačuvana:", preferencije[preferencijaId]?.naziv);

                // Provera da li postoji validan naziv
                if (preferencije[preferencijaId-1] && preferencije[preferencijaId-1].naziv) {
                    toast.success(`Preferencija ${preferencije[preferencijaId-1].naziv} je uspešno sačuvana!`, {
                        position: "top-center",  
                        hideProgressBar: true,  
                        autoClose: 5000,  
                    });
                } else {
                    toast.error("Došlo je do greške pri prikazu preferencije.", {
                        position: "top-center",
                        hideProgressBar: true,
                        autoClose: 5000,
                    });
                }
            })
            .catch((error) => {
                console.error("Došlo je do greške prilikom čuvanja preferencije.", error);
                toast.error("Došlo je do greške prilikom čuvanja preferencije.", {
                    position: "top-center",  // Centriranje obaveštenja
                    hideProgressBar: true,  // Uklanjanje trake za učitavanje
                    autoClose: 5000,  // Automatsko zatvaranje obaveštenja nakon 5 sekundi
                });
            });
        });
    };

    useEffect(() => {



        const korisnikId = window.sessionStorage.getItem("id");
        const authToken = window.sessionStorage.getItem("auth_token");

        if (!korisnikId || !authToken) {
            console.error("Nedostaje korisnički ID ili token.");
            return;
        }

        axios.get(`/api/korisnici/${korisnikId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            setKorisnik(response.data.korisnik);
        })
        .catch((error) => {
            console.error("Greška pri dohvatanju podataka:", error);
        });

        axios.get("api/preferencije")
        .then((response) => {
            setPreferencije(response.data.data);
        });

         // Dohvati korisničke preferencije iz baze
         axios.get(`/api/korisnici/${korisnikId}/preferencije`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => {

            const korPref = response.data.data.map(item => item.preferencija.id);
            setKorisnikPreferencije(korPref);  // Postavljanje u stanje
            console.log(korPref);
            //setSelectedPreferencije(korisnikovePreferencije);
        })
        .catch((error) => {
            console.error("Greška pri dohvatanju korisničkih preferencija:", error);
        });


    // Dohvati namirnice iz baze
         axios.get(`api/namirnice`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            setNamirnice(response.data.namirnice);
        })
        .catch((error) => {
            console.error("Greška pri dohvatanju namirnica", error);
        });
        
         // Dohvati korisničke alergije iz baze
         axios.get(`/api/korisnici/${korisnikId}/alergije`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            console.log(response);

            const korAlerg = response.data.data.map(item => item.namirnica);
            setKorisnikAlergije(korAlerg);
           
        })
        .catch((error) => {
            setKorisnikAlergije([]);
            console.error("Greška pri dohvatanju korisničkih preferencija:", error);
        });


    }, []);

    const renderSectionContent = () => {
        switch (selectedSection) {
            case "profil":
                return (
                    <div style={styles.profileCard}>
    {korisnik ? (
        <>
            <p><strong>Ime:</strong> {korisnik.ime}</p>
            <p><strong>Prezime:</strong> {korisnik.prezime}</p>
            <p><strong>Korisničko ime:</strong> {korisnik.korisnicko_ime}</p>
            <p><strong>Email:</strong> {korisnik.email}</p>
        </>
    ) : (
        <p style={styles.noData}>Nema podataka o korisniku.</p>
    )}
   
    {/* Add the table for "Moje Preferencije" */}
    <div style={styles.preferencijeTableContainer}>

        <h3>Moje Preferencije</h3>
      
        {korisnikPreferencije.length > 0 ? (
            
            <table style={styles.table}>
                  
                  <tbody>
    {korisnikPreferencije.map((preferencijaId) => {
      const preferencija = preferencije.find(p => p.id === preferencijaId);  // Pronalazak odgovarajuće preferencije
      return preferencija && <tr key={preferencija.id}><td>{preferencija.naziv}</td></tr>;
    })}
  </tbody>
            </table>
        ) : (
            <p style={styles.noData}>Nemate postavljene preferencije.</p>
        )}
    </div>

    <div style={styles.preferencijeTableContainer}>

        <h3>Moje Alergije</h3>
      
        {korisnikAlergije.length > 0 ? (
            
            <table style={styles.table}>
                  
                  <tbody>
    {korisnikAlergije.map((namirnicaId) => {
      const namirnica = namirnice.find(n => n.id === namirnicaId.id); 
      return namirnica && <tr key={namirnica.id}><td>{namirnica.naziv}</td></tr>;
    })}
  </tbody>
            </table>
        ) : (
            <p style={styles.noData}>Nemate postavljene Alergije.</p>
        )}
    </div>
</div>
                );
            case "preferencije":
                return (
                    <div style={styles.contentWrapper}>
    <h3 style={styles.sectionTitle}>Moje Preferencije</h3>
    <p style={styles.description}>
        Dodajte svoje preferencije kako bi Vam se prikazivali samo recepti koji odgovaraju vašim potrebama. Na osnovu ovih preferencija, biće vam prikazani recepti koji zadovoljavaju vaše izabrane kriterijume, bilo da se radi o veganskim, vegetarijanskim, ili drugim specifičnim zahtevima.
    </p>
    <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column', marginTop: '20px' }}>
        <Preferencije 
            preferencije={preferencije} 
            handlePreferenceChange={handlePreferenceChange} 
            title={"Izaberite svoje preferencije:"}
            textColor={"#6e6e6e "} 
            checkedPreferencije = {korisnikPreferencije}
            positionStyle={{
                position: "relative",
                top: "20px",
                minHeight: "auto", 
                maxHeight: "auto",
                textAlign: "left", 
                minWidth: "30vw",
                maxWidth: "30vw",
                borderRadius: "10px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                backgroundColor: "#f0f8f4", // svetla boja pozadine za preferencije
            }} 
        />      
        {/* Save Button */}
        <button 
            style={{
                marginTop: '40px',
                padding: '10px 20px',
                fontSize: '16px',
                color: '#fff',
                backgroundColor: '#8c9c8e', // Boja koja se uklapa sa pozadinom
                border: 'none',
                borderRadius: '5px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
            }}
            onClick={handleSavePreferences}
        >
            Sačuvaj
        </button>
    </div>
</div>
                );
            case "alergije":
                return (
                    <div style={styles.contentWrapper}>
    <h3 style={styles.sectionTitle}>Moje Alergije</h3>
    <p style={styles.description}>
        Dodajte svoje alergije kako biste videli samo recepte koji su bezbedni za vas. Na osnovu unetih alergija, biće vam prikazani isključivo recepti koji ne sadrže namirnice na koje ste osetljivi, omogućavajući vam sigurno i bezbrižno planiranje obroka.
    </p>
    <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column', marginTop: '20px' }}>
        {/* Tabela */}
        
        <h5>Dodaj alergiju:</h5>
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

                                <h5>Moje alergije:</h5>
<div style={{ minHeight: "0vh", maxHeight: "25vh", overflowY: "auto", marginBottom: "65px" }}>
    <table className="table table-bordered">
        
        <tbody>
            {selectedNamirnice.map((namirnica, index) => (
                <tr key={index}>
                    <td>{namirnica.naziv}</td>
                    <td>
                        <CiCircleMinus style={{ cursor: "pointer" }} onClick={() => removeNamirnica(namirnica.id)} />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
        
        {/* Save Button */}
        <button 
            style={{
                marginTop: '40px',
                padding: '10px 20px',
                fontSize: '16px',
                color: '#fff',
                backgroundColor: '#8c9c8e', // Boja koja se uklapa sa pozadinom
                border: 'none',
                borderRadius: '5px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
            }}
            onClick={handleSaveNamirnice}
        >
            Sačuvaj
        </button>
            </div>
            </div>
                );
            case "promeniPodatke":
                return     <div style={styles.contentWrapper}>
                <h3 style={styles.sectionTitle}>Promenite Vaše podatke:</h3>
                
                <form onSubmit={handleSubmit}>
                    {/* Prvi red: Ime i Prezime */}
                    <div style={{ display: "flex", gap: "20px", marginBottom: "5px", marginTop: "50px" }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <label htmlFor="ime" style={{ width: "20%", marginRight: '10px' }}>Ime:</label>
                            <input type="text" id="ime" name="ime" style={{ width: "75%" }} value={korisnikCopy.ime} onChange={handleInputChange} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <label htmlFor="prezime" style={{ width: "20%", marginRight: '10px' }}>Prezime:</label>
                            <input type="text" id="prezime" name="prezime" style={{ width: "75%" }} value={korisnikCopy.prezime} onChange={handleInputChange} />
                        </div>
                    </div>
    
                    {/* Drugi red: Email i Korisničko ime */}
                    <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <label htmlFor="email" style={{ width: "20%", marginRight: '10px' }}>Email:</label>
                            <input type="email" id="email" name="email" style={{ width: "75%" }} value={korisnikCopy.email} onChange={handleInputChange} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <label htmlFor="korisnickoIme" style={{ width: "20%", marginRight: '10px' }}>Korisničko ime:</label>
                            <input type="text" id="korisnickoIme" name="korisnicko_ime" style={{ width: "75%" }} value={korisnikCopy.korisnicko_ime} onChange={handleInputChange} />
                        </div>
                    </div>
                    
                    {/* Dugme za čuvanje */}
                    <button type="submit" style={{
                        marginTop: '40px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        color: '#fff',
                        backgroundColor: '#8c9c8e',
                        border: 'none',
                        borderRadius: '5px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                    }}>
                        Sačuvaj
                    </button>
                </form>

                <p className="text-center text-muted mt-5 mb-0">
                      Želite da promenite šifru?{" "}
                      <Link to="/forgot_password" className="fw-bold text-body" style={{ fontSize: "min(1vw, 1.8vh)" }}>
                        <u>Kliknite ovde</u>
                      </Link>
                    </p>
            </div>
            default:
                return null;
        }
    };

    return (
        <div className="container-fluid" style={styles.container}>
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 p-4" style={styles.sidebar}>
                    <ul className="list-unstyled">
                        <li 
                            style={styles.sidebarItem}
                            onClick={() => setSelectedSection("profil")}
                        >
                            Moj profil
                            <CgProfile style={styles.icon} />
                        </li>
                        <li 
                            style={styles.sidebarItem}
                            onClick={() => setSelectedSection("promeniPodatke")}
                        >
                            Promeni podatke
                            <AiFillEdit style={styles.icon} />
                        </li>
                        <li 
                            style={styles.sidebarItem}
                            onClick={() => setSelectedSection("preferencije")}
                        >
                            Moje Preferencije
                            <AiOutlineReconciliation style={styles.icon} />
                        </li>
                        <li 
                            style={styles.sidebarItem}
                            onClick={() => setSelectedSection("alergije")}
                        >
                            Moje Alergije
                            <MdOutlineNoFood style={styles.icon} />
                        </li>
                    </ul>
                </div>

                {/* Main content */}
                <div className="col-md-9 p-4" style={styles.mainContent}>
                    <h2 className="text-center mb-4" style={styles.heading}>Moj Profil</h2>
                    {renderSectionContent()}
                </div>
            </div>
            <ToastContainer
                position="top-center"  // Centriranje obaveštenja
                hideProgressBar={true}  // Uklanjanje trake za učitavanje
                autoClose={5000}  // Automatsko zatvaranje nakon 5 sekundi
            /> 
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: "rgba(178, 246, 175, 0.8)",
        minHeight: "100vh",
    },
    sidebar: {
        backgroundColor: "#2d8659", // Tamna zelena
        boxShadow: "2px 0px 5px rgba(0,0,0,0.2)",
        //borderRadius: "10px",
        height: "100vh", // Sidebar sada pokriva celu visinu
        paddingTop: "30px", // Dodato malo prostora na vrhu
    },
    sidebarItem: {
        color: "#fff", // Početna boja teksta
        fontSize: "18px",
        padding: "12px 0",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s ease", // Glatka animacija
    },
    sidebarItemHover: {
        backgroundColor: "#1e6e45", // Pozadina na hover
        color: "#ffcc00", // Tekst boja na hover
    },
    icon: {
        color: "#fff", // Početna boja ikona
        fontSize: "20px", // Veličina ikona
    },
    mainContent: {
        backgroundColor: "#fff",
        borderRadius: "2px",
        boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
        padding: "30px",
        marginTop: "10px", // Razmak od sidebar-a
        minHeight: "80vh",
    },
    heading: {
        fontSize: "28px",
        color: "#333", // Tamno siva boja za heading
        marginBottom: "20px",
        fontWeight: "600",
    },
    profileCard: {
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        marginTop: "20px",
    },
    noData: {
        color: "#888", // Siva boja za tekst "No Data"
        fontSize: "18px",
        fontStyle: "italic",
    },

    contentWrapper: {
        marginTop: "40px", 
        marginBottom: "40px", 
        textAlign: "center", 
        padding: "20px",
        backgroundColor: "#e9f7df", 
        borderRadius: "12px", 
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
    },
    sectionTitle: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#333",
        marginBottom: "15px",
    },
    description: {
        fontSize: "16px",
        color: "#666",
        marginBottom: "25px",
        maxWidth: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        lineHeight: "1.6",
    },
    preferencijeTableContainer: {
        marginTop: "20px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    tableHeader: {
        padding: "8px",
        backgroundColor: "#66bb6a",
        color: "white",
        textAlign: "left",
    },
    tableCell: {
        padding: "8px",
        borderBottom: "1px solid #ddd",
    },
    noData: {
        color: "#888",
    },
};

export default ProfilPage;
