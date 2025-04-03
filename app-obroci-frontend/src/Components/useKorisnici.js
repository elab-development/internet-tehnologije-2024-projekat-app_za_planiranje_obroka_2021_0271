import { useEffect, useState } from 'react';
import axios from 'axios';

const useKorisnici = () => {
    const [korisnici, setKorisnici] = useState([]);
    const [initialKorisnici, setInitialKorisnici] = useState([]);

    useEffect(() => {
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
        })
        .catch(error => console.error("Greška pri dohvatanju korisnika:", error));
    }, []);

    const deleteKorisnik = (id) => {
        const authToken = window.sessionStorage.getItem("auth_token");

        axios.delete(`/api/obroci/korisnici/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(() => {
            alert("Obroci korisnika uspesno obrisani.");
        })
        .catch(() => alert("Došlo je do greške pri brisanju obroka korisnika."));
    

        axios.delete(`/api/korisnici/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(() => {
            setKorisnici(prev => prev.filter(korisnik => korisnik.id !== id));
            alert("Korisnik je uspešno obrisan.");
        })
        .catch(() => alert("Došlo je do greške pri brisanju korisnika."));
    };

    const changeUserRole = (id, newRole) => {
        setKorisnici(prev => prev.map(korisnik =>
            korisnik.id === id ? { ...korisnik, uloga: newRole } : korisnik
        ));
    };

    const saveRoleChanges = () => {
        const authToken = window.sessionStorage.getItem("auth_token");

        const changedUsers = korisnici.filter(korisnik => {
            const originalUser = initialKorisnici.find(u => u.id === korisnik.id);
            return originalUser && korisnik.uloga !== originalUser.uloga;
        });

        if (changedUsers.length === 0) {
            alert('Nema promena!');
            return;
        }

        Promise.all(changedUsers.map(korisnik =>
            axios.patch(`/api/korisnici/${korisnik.id}/uloga`, { uloga: korisnik.uloga }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            })
        ))
        .then(() => {
            setInitialKorisnici(korisnici);
            alert('Uloge korisnika su uspešno ažurirane!');
        })
        .catch(() => alert('Došlo je do greške pri ažuriranju uloga!'));
    };

    return { korisnici, deleteKorisnik, changeUserRole, saveRoleChanges };
};

export default useKorisnici;
