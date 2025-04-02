import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import SacuvajButton from './SacuvajButton';
import useKorisnici from './useKorisnici'; 

function KorisniciTable() {
    const { korisnici, deleteKorisnik, changeUserRole, saveRoleChanges } = useKorisnici();

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
                                <select 
                                    value={korisnik.uloga}
                                    onChange={(e) => changeUserRole(korisnik.id, e.target.value)}
                                >
                                    <option value="korisnik">Korisnik</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => deleteKorisnik(korisnik.id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <SacuvajButton tekst={'Sacuvaj izmene'} clickFunction={saveRoleChanges} />
        </div>
    );
}

export default KorisniciTable;
