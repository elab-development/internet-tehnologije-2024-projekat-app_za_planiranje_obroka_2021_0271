import { useState, useEffect } from 'react';
import axios from 'axios';

const usePreferencije = () => {
    const [preferencije, setPreferencije] = useState([]);
    const [editedValues, setEditedValues] = useState({});
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        const authToken = window.sessionStorage.getItem("auth_token");

        axios.get('/api/preferencije', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => setPreferencije(response.data.data))
        .catch(error => console.error("Greška pri dohvatanju preferencija:", error));
    }, []);

    const handleDoubleClick = (id, value) => {
        setEditing(id);
        setEditedValues({ naziv: value });
    };

    const handleChange = (e) => {
        setEditedValues({ naziv: e.target.value });
    };

    const handleSaveChanges = () => {
        if (!editing) return;
        const authToken = window.sessionStorage.getItem("auth_token");

        axios.put(`/api/preferencije/${editing}`, { naziv: editedValues.naziv }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            }
        })
        .then(() => {
            setPreferencije(preferencije.map(pref => 
                pref.id === editing ? { ...pref, naziv: editedValues.naziv } : pref
            ));
            setEditing(null);
            setEditedValues({});
        })
        .catch(error => console.error("Greška pri ažuriranju preferencije:", error));
    };

    const handleDeletePreferencija = (id) => {
        const authToken = window.sessionStorage.getItem("auth_token");

        axios.delete(`/api/preferencije/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(() => {
            setPreferencije(prevState => prevState.filter(preferencija => preferencija.id !== id));
            alert("Preferencija je uspešno obrisana.");
        })
        .catch(error => {
            console.error("Greška pri brisanju preferencije:", error);
            alert("Došlo je do greške pri brisanju preferencije.");
        });
    };

    return {
        preferencije,
        editedValues,
        editing,
        handleDoubleClick,
        handleChange,
        handleSaveChanges,
        handleDeletePreferencija
    };
};

export default usePreferencije;
