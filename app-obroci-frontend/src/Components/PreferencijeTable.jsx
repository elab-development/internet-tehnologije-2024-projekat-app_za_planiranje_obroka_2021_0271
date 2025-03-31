import React, { useEffect, useState } from 'react';
import SacuvajButton from './SacuvajButton';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

function PreferencijeTable() {
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
        .then(response => { 
            setPreferencije(response.data.data);
        })
        .catch((error) => {
            console.error("Greška pri dohvatanju preferencija:", error);
        });
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
        .catch(error => {
            console.error("Greška pri ažuriranju preferencije:", error);
        });
    };


    const handleDeletePreferencija = (id, setPreferencije) => {
        const authToken = window.sessionStorage.getItem("auth_token");
    
        axios.delete(`/api/preferencije/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => {
            // Update the 'preferencije' state by filtering out the deleted item
            setPreferencije(prevState => prevState.filter(preferencija => preferencija.id !== id));
            alert("Preferencija je uspešno obrisana.");
        })
        .catch(error => {
            console.error("Greška pri brisanju preferencije:", error);
            alert("Došlo je do greške pri brisanju preferencije.");
        });
    };

    
    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Obriši</th>
                    </tr>
                </thead>
                <tbody>
                    {preferencije.map(preferencija => (
                        <tr key={preferencija.id}>
                            <td onDoubleClick={() => handleDoubleClick(preferencija.id, preferencija.naziv)}>
                                {editing === preferencija.id ? (
                                    <input
                                        type="text"
                                        value={editedValues.naziv || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    preferencija.naziv
                                )}
                            </td>
                            <td>
                                 <button 
                                    className="btn btn-danger"
                                        onClick={() => handleDeletePreferencija(preferencija.id, setPreferencije)} 
                                        >
                                        <FaTrashAlt /> {/* Trash icon */}
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <SacuvajButton tekst={'Sačuvaj izmene'} clickFunction={handleSaveChanges} />
        </div>
    );
}

export default PreferencijeTable;
