import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SacuvajButton from './SacuvajButton';
import { FaTrashAlt } from 'react-icons/fa';
import DodajNamirnicuModal from "./DodajNamirnicuModal";

function NamirniceTable() {
    const [namirnice, setNamirnice] = useState([]);
    const [editedValues, setEditedValues] = useState({}); // Držimo vrednosti koje se uređuju
    const [editing, setEditing] = useState(null); // Držimo koji red je trenutno u režimu uređivanja
    const [showModal, setShowModal] = useState(false);

    const handleAddNamirnica = () => {
        setShowModal(true);
      };

      const handleCloseModal = () => {
        setShowModal(false);
      };


    useEffect(() => {
        const authToken = window.sessionStorage.getItem("auth_token");
        axios.get('/api/namirnice', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => { 
            setNamirnice(response.data.namirnice); 
        })
        .catch((error) => {
            console.error("Greška pri dohvatanju namirnica:", error);
        });
    }, []);


    const handleDeleteNamirnica = (id, setNamirnice) => {
        const authToken = window.sessionStorage.getItem("auth_token");
    
        axios.delete(`/api/namirnice/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => {
            // Update the 'namirnice' state by filtering out the deleted item
            setNamirnice(prevState => prevState.filter(namirnica => namirnica.id !== id));
            alert("Namirnica je uspešno obrisana.");
        })
        .catch(error => {
            console.error("Greška pri brisanju namirnice:", error);
            alert("Došlo je do greške pri brisanju namirnice.");
        });
    };

    const handleDoubleClick = (id, column, value) => {
        setEditing(id); // Postavi koji red uređujemo
        setEditedValues(prev => ({ ...prev, [column]: value })); // Postavi vrednost za uređivanje
    };

    const handleChange = (e, field) => {
        const newValue = e.target.value; // Get the updated value from the input field
    
        // Update the specific field in editedValues based on user input
        setEditedValues(prev => ({
            ...prev,
            [field]: newValue,
        }));
    };

    const handleSaveChanges = () => {
        const authToken = window.sessionStorage.getItem("auth_token");
    
        // Ažurirani podaci sa vrednostima koje korisnik unese
        const updatedData = {
            naziv: editedValues.naziv || namirnice.find(namirnica => namirnica.id === editing)?.naziv,
            broj_kalorija: editedValues.broj_kalorija || namirnice.find(namirnica => namirnica.id === editing)?.broj_kalorija,
            proteini: editedValues.proteini || namirnice.find(namirnica => namirnica.id === editing)?.proteini,
            masti: editedValues.masti || namirnice.find(namirnica => namirnica.id === editing)?.masti,
            ugljeni_hidrati: editedValues.ugljeni_hidrati || namirnice.find(namirnica => namirnica.id === editing)?.ugljeni_hidrati,
        };
    
 
    
        // Šaljemo PUT zahtev sa ažuriranim podacima
        axios.put(`/api/namirnice/${editing}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            }
        })
        .then(response => {
            // Ažuriramo tabelu sa novim podacima
            setNamirnice(namirnice.map(namirnica => 
                namirnica.id === editing ? { ...namirnica, ...updatedData } : namirnica
            ));
            setEditing(null); 
            setEditedValues({}); 
        })
        .catch(error => {
            console.error("Greška pri ažuriranju namirnice:", error);
        });
    };

    const handleSaveNamirnica = (newNamirnica) => {
        setNamirnice((prevNamirnice) => [...prevNamirnice, newNamirnica]);
      };

    return (
        <div>
              <DodajNamirnicuModal
        showModal={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveNamirnica}
            />
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Broj kalorija</th>
                        <th>Proteini</th>
                        <th>Masti</th>
                        <th>Ugljeni hidrati</th>
                        <th>Obrisi</th>

                    </tr>
                </thead>
                <tbody>
                    {namirnice.map(namirnica => (
                        <tr key={namirnica.id}>
                            <td
                            onDoubleClick={() => handleDoubleClick(namirnica.id, 'naziv', namirnica.naziv)}>
                            {editing === namirnica.id ? (
                                <input
                                    type="text"
                                    value={editedValues.naziv !== undefined ? editedValues.naziv : namirnica.naziv}  // Ensure this properly handles deletion
                                    onChange={(e) => handleChange(e, 'naziv')}
                                />
                            ) : (
                                namirnica.naziv
                            )}
                        </td>
                            <td 
                                onDoubleClick={() => handleDoubleClick(namirnica.id, 'broj_kalorija', namirnica.broj_kalorija)}>
                                {editing === namirnica.id ? (
                                    <input
                                        type="number"
                                        value={editedValues.broj_kalorija !== undefined ? editedValues.broj_kalorija : namirnica.broj_kalorija} 
                                        onChange={(e) => handleChange(e, 'broj_kalorija')}
                                    />
                                ) : (
                                    namirnica.broj_kalorija
                                )}
                            </td>
                            <td 
                                onDoubleClick={() => handleDoubleClick(namirnica.id, 'proteini', namirnica.proteini)}>
                                {editing === namirnica.id ? (
                                    <input
                                        type="number"
                                        value={editedValues.proteini !== undefined ? editedValues.proteini : namirnica.proteini} 
                                        onChange={(e) => handleChange(e, 'proteini')}
                                    />
                                ) : (
                                    namirnica.proteini
                                )}
                            </td>
                            <td 
                                onDoubleClick={() => handleDoubleClick(namirnica.id, 'masti', namirnica.masti)}>
                                {editing === namirnica.id ? (
                                    <input
                                        type="number"
                                        value={editedValues.masti !== undefined ? editedValues.masti : namirnica.masti} 
                                        onChange={(e) => handleChange(e, 'masti')}
                                    />
                                ) : (
                                    namirnica.masti
                                )}
                            </td>
                            <td 
                                onDoubleClick={() => handleDoubleClick(namirnica.id, 'ugljeni_hidrati', namirnica.ugljeni_hidrati)}>
                                {editing === namirnica.id ? (
                                    <input
                                        type="number"
                                        value={editedValues.ugljeni_hidrati !== undefined ? editedValues.ugljeni_hidrati  : namirnica.ugljeni_hidrati } 
                                        onChange={(e) => handleChange(e, 'ugljeni_hidrati')}
                                    />
                                ) : (
                                    namirnica.ugljeni_hidrati
                                )}
                            </td>
                            <td>
                                <button 
                                className="btn btn-danger"
                                onClick={() => handleDeleteNamirnica(namirnica.id, setNamirnice)} 
                                >
                            <FaTrashAlt /> {/* Trash icon */}
                                </button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <SacuvajButton tekst={'Sačuvaj izmene'} clickFunction={handleSaveChanges} />
            <SacuvajButton tekst={'Dodaj namirnicu'} clickFunction={handleAddNamirnica} />
        </div>
    );
}

export default NamirniceTable;

