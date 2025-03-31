import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import SacuvajButton from './SacuvajButton';


function KorisniciTable() {
    const [korisnici, setKorisnici] = useState([]);
    const [initialKorisnici, setInitialKorisnici] = useState([]);
    
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
             
                setKorisnici(response.data.korisnici); 
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
    
        // Uzima samo korisnike kojima su promenjene uloge
        const changedUsers = korisnici.filter(korisnik => {
            const originalUser = initialKorisnici.find(u => u.id === korisnik.id);
            return originalUser && korisnik.uloga !== originalUser.uloga;
        });
    
        console.log("PROMENJENOOOOOOO");
        console.log(changedUsers);
    
        if (changedUsers.length === 0) {
            alert('Nema promena!');
            return;
        }
    
        const requests = changedUsers.map(korisnik => {
            return axios.patch(`/api/korisnici/${korisnik.id}/uloga`, { uloga: korisnik.uloga }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });
        });
    
        Promise.all(requests)
            .then(() => {
                // Update the initialKorisnici after the changes
                setInitialKorisnici(korisnici);  // Sync initialKorisnici with the updated korisnici state
                alert('Uloge korisnika su uspešno ažurirane!');
            })
            .catch(() => {
                alert('Došlo je do greške pri ažuriranju uloga!');
            });
    };
    
  return (
    <div>
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
    </div>
  )
}

export default KorisniciTable
