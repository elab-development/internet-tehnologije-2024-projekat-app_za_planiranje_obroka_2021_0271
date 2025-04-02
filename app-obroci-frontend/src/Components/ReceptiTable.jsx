import React from 'react'
import useRecepti from './useRecepti';
import { FaTrashAlt } from 'react-icons/fa';
function ReceptiTable() {
    const {
       recepti,
       handleDeleteRecept
    } = useRecepti ();
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
                        {recepti.map(recept => (
                            <tr key={recept.id}>
                                <td>
                                    {recept.naziv}
                                </td>
                                <td>
                                     <button 
                                        className="btn btn-danger"
                                            onClick={() => handleDeleteRecept(recept.id)} 
                                            >
                                            <FaTrashAlt /> {/* Trash icon */}
                                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
  )
}

export default ReceptiTable
