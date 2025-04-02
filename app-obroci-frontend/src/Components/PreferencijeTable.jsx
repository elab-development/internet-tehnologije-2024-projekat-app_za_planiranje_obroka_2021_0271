import React, { useEffect, useState } from 'react';
import SacuvajButton from './SacuvajButton';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import usePreferencije from './usePreferencija';

function PreferencijeTable() {
    const {
        preferencije,
        editedValues,
        editing,
        handleDoubleClick,
        handleChange,
        handleSaveChanges,
        handleDeletePreferencija
    } = usePreferencije();

    
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
                                        onClick={() => handleDeletePreferencija(preferencija.id)} 
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
