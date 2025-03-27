import React, { useEffect, useState } from 'react'
import SideBar from './SideBar';
import { FaUserCog } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { HiClipboardDocumentList } from "react-icons/hi2";
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import SacuvajButton from './SacuvajButton';




function AdminPage() {
     const [selectedSection, setSelectedSection] = useState("korisnici");
     const [korisnici, setKorisnici] = useState([]);
     const [initialKorisnici, setInitialKorisnici] = useState([]);

    const menuItems = [
        { id: 1, label: "Upravljaj korisnicima", section: "korisnici", icon: FaUserCog },
        { id: 2, label: "Upravljaj namirnicama", section: "namirnice", icon:  MdFastfood},
        { id: 3, label: "Upravljaj preferencijama", section: "preferencije", icon: HiClipboardDocumentList }
    ];

    useEffect(() => {
        const korisnikId = window.sessionStorage.getItem("id");
        const authToken = window.sessionStorage.getItem("auth_token");

        axios.get('/api/korisnici', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(response => { 
                console.log("KORISNICI");
                console.log(response);
                setKorisnici(response.data.korisnici); // Assuming the response has 'data' field with korisnici
                setInitialKorisnici(response.data.korisnici);  
            }).catch((error) => {
                console.error("Greška pri dohvatanju korisnika:", error);
            });;
    }, []);


    const handleDeleteKorisnik = (id, setKorisnici) => {
        const authToken = window.sessionStorage.getItem("auth_token");
      
        axios.delete(`/api/korisnici/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(response => {
         
          setKorisnici(prevState => prevState.filter(korisnik => korisnik.id !== id));
          alert("Korisnik je uspešno obrisan.");
        })
        .catch(error => {
          console.error("Greška pri brisanju korisnika:", error);
          alert("Došlo je do greške pri brisanju korisnika.");
        });
      };

      const handleRoleChange = (id, newRole) => {
        setKorisnici(prevKorisnici =>
            prevKorisnici.map(korisnik =>
                korisnik.id === id
                    ? { ...korisnik, uloga: newRole }
                    : korisnik
            )
        );
    };

    const handleSaveRoleChanges = () => {
        const authToken = window.sessionStorage.getItem("auth_token");

        // Filter only the users whose roles have changed
        const changedUsers = korisnici.filter(korisnik => {
            const originalUser = initialKorisnici.find(u => u.id === korisnik.id);
            return originalUser && korisnik.uloga !== originalUser.uloga;
        });

        // If there are no changes, just return early
        if (changedUsers.length === 0) {
            alert('No changes made!');
            return;
        }

        // Update the roles of users who have changed their roles
        const requests = changedUsers.map(korisnik => {
            return axios.patch(`/api/korisnici/${korisnik.id}/uloga`, { uloga: korisnik.uloga }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
        });

        // Wait for all requests to finish
        Promise.all(requests)
            .then(() => {
                alert('Uloge korisnika su uspešno ažurirane!');
            })
            .catch(() => {
                alert('Došlo je do greške pri ažuriranju uloga!');
            });
    };
    

    const renderSectionContent = () => {
        switch (selectedSection) {
            case "korisnici":
                return <div style={styles.profileCard}>
                <h3 className="text-center">Korisnici</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Email</th>
                            <th>Korisničko ime</th>
                            <th>Uloga</th>
                            <th>Obrisi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {korisnici.map(korisnik => (
                        <tr key={korisnik.id}>
                            <td>{korisnik.ime}</td>
                            <td>{korisnik.prezime}</td>
                            <td>{korisnik.email}</td>
                            <td>{korisnik.korisnicko_ime}</td>
                            <td>
                                {/* Dropdown for changing role */}
                                <select 
                                    value={korisnik.uloga}
                                    onChange={(e) => handleRoleChange(korisnik.id, e.target.value)}
                                >
                                    <option value="korisnik">Korisnik</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteKorisnik(korisnik.id, setKorisnici)} 
                                >
                                    <FaTrashAlt /> {/* Trash icon */}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <SacuvajButton tekst={'Sacuvaj izmene'} clickFunction={handleSaveRoleChanges} />
            </div>;
            case "namirnice":
                return <div style={styles.profileCard}>
                <h3 className="text-center">Namirnice</h3>
             <table className="table table-bordered">
                 <thead>
                     <tr>
                         <th>Naziv</th>
                         <th>Broj kalorija</th>
                         <th>Proteini</th>
                         <th>Masti</th>
                         <th>Ugljeni hidrati</th>
                     </tr>
                 </thead>
                 <tbody>
                     {/* Empty rows for now */}
                 </tbody>
             </table>
         </div>;
            case "preferencije":
                return <div> PREFFF</div>;
            default:
                return null;
        }
    };
  return (
    <div className="container-fluid" style={styles.container}>
            <div className="row">
                {/* Sidebar */}
                <SideBar menuItems={menuItems} setSelectedSection={setSelectedSection} />

                {/* Main content */}
                <div className="col-md-9 p-4" style={styles.mainContent}>
                    <h2 className="text-center mb-4" style={styles.heading}>Admin Panel</h2>
                    {renderSectionContent()}
                </div>
            </div>
            
            
            </div>
  )
}


const styles = {
    container: {
        backgroundColor: "rgba(178, 246, 175, 0.8)",
        minHeight: "100vh",
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

}




export default AdminPage
