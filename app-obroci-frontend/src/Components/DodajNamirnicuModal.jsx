import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DodajNamirnicuModal({ showModal, onClose, onSave }) {
  const [formData, setFormData] = useState({
    naziv: "",
    broj_kalorija: 0,
    proteini: 0,
    masti: 0,
    ugljeni_hidrati: 0,
  });

  const [predlozi, setPredlozi] = useState([]); // Ovdje ćeš čuvati predloge iz API-a
  const [isLoading, setIsLoading] = useState(false); // Ovdje pratiš da li se podaci učitavaju
  const [errorMessage, setErrorMessage] = useState(""); // Ovdje čuvamo poruku o grešci

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setErrorMessage(""); // Reset any previous error messages
    setIsLoading(true);
    
    axios
      .get(`/api/nutritivne-vrednosti/${formData.naziv}`)
      .then((response) => {
        if (response.data.length === 0) {
          setErrorMessage("API nije pronašao ništa");
        } else {
          console.log(response);
          setPredlozi(response.data);
          
        }
      })
      .catch((error) => {
        console.error("Greška pri pretrazi namirnice:", error);
        setErrorMessage("API nije pronašao ništa");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSelectPredlog = (predlog) => {
    // Kada korisnik klikne na neki predlog, popuni formu
    setFormData({
      naziv: predlog.naziv,
      broj_kalorija: predlog.broj_kalorija,
      proteini: predlog.proteini,
      masti: predlog.masti,
      ugljeni_hidrati: predlog.ugljeni_hidrati,
    });
    setPredlozi([]);
  };

  const handleSubmit = () => {
    const authToken = window.sessionStorage.getItem("auth_token");

    axios
      .post('/api/namirnice', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("JA SAM IZ SAVEA");
        console.log(response.data);
        onSave(response.data[1]);
        onClose();
      })
      .catch((error) => {
        console.error("Greška prilikom slanja podataka:", error);
        alert("Došlo je do greške prilikom slanja podataka.");
      });
  };

  if (!showModal) return null;

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1050',
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle} className="modal-content">
        <button
          className="btn-close position-absolute top-0 end-0"
          onClick={onClose}
          aria-label="Close"
        />
        <h2 className="text-center mb-4">Dodaj Namirnicu</h2>
        <form>
          <div className="mb-3">
            <label>Naziv:</label>
            <div className="d-flex">
              <input
                type="text"
                name="naziv"
                className="form-control"
                value={formData.naziv}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn btn-primary ml-2"
                onClick={handleSearch}
              >
                Pretraži Namirnicu
              </button>
            </div>

           

            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {predlozi.length > 0 ? (
  <ul className="suggestions-list">
    {predlozi.map((predlog, index) => (
      <li key={index} onClick={() => handleSelectPredlog(predlog)}>
        {predlog.naziv || "No name available"}  {/* Fallback for missing names */}
      </li>
    ))}
  </ul>
) : null}
          </div>

          <div className="mb-3">
            <label>Broj kalorija:</label>
            <input
              type="number"
              name="broj_kalorija"
              className="form-control"
              value={formData.broj_kalorija}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Proteini:</label>
            <input
              type="number"
              name="proteini"
              className="form-control"
              value={formData.proteini}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Masti:</label>
            <input
              type="number"
              name="masti"
              className="form-control"
              value={formData.masti}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Ugljeni hidrati:</label>
            <input
              type="number"
              name="ugljeni_hidrati"
              className="form-control"
              value={formData.ugljeni_hidrati}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <div className="d-flex justify-content-center">
          <button onClick={handleSubmit} className="btn btn-primary">
            Sačuvaj
          </button>
        </div>
      </div>
    </div>
  );
}

export default DodajNamirnicuModal;
