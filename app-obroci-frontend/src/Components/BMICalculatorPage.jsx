import axios from 'axios';
import React, { useState } from 'react'
import { IoBody } from "react-icons/io5";

function BMICalculatorPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);  // For storing the BMI result


  const handleSubmit = (e) => {
    e.preventDefault();

   
    axios.post('/api/calculate-bmi', {
      weight: weight,
      height: height,
    })
    .then((response) => {
  
      setBmiResult(response.data);  
    })
    .catch((error) => {
      console.error("There was an error calculating the BMI:", error);
    });
  };
  return (
    
    <div 
      className="d-flex flex-column justify-content-start align-items-center" 
      style={{
        backgroundColor: 'rgba(178, 246, 175, 0.8)', 
        height: '100vh', 
        margin: 0, 
        padding: 0, 
        width: '100vw'
      }}
    >
      <h1
        style={{
          color: '#2d6a4f', 
          fontSize: '40px', 
          fontWeight: 'bold', 
          marginTop: '30px',  
          marginBottom: '60px',
          textAlign: 'center', 
          width: '100%'
        }}
      >
        BMI Kalkulator
        <IoBody style={{ marginLeft: '10px' }} />
      </h1>

      <div className="d-flex align-items-center" style={{ width: '80%', maxWidth: '1200px' }}>
      <div 
          className="text-center mb-5" 
          style={{
            flex: 1,
            backgroundColor: '#ffffff',  // White background for the cloud effect
            borderRadius: '30px',        // Rounded corners
            padding: '30px',             // Inner padding
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Shadow for the cloud effect
            maxWidth: '600px',           // Max width for the cloud box
            margin: '0 auto',            // Centering the content horizontally
          }}
        >
          <h3 style={{ color: '#2d6a4f' }}>Kategorije BMI-ja</h3>
          <ul style={{ color: '#2d6a4f', fontSize: '18px', lineHeight: '1.6' }}>
  <li><strong>Premala telesna težina (BMI {"<"} 18.5):</strong> Osobe sa BMI-jem ispod 18.5 mogu imati premalu telesnu masu, što može povećati rizik od raznih zdravstvenih problema.</li>
  <li><strong>Normalna telesna težina (18.5 - 24.9):</strong> Ova kategorija označava normalnu telesnu masu koja je idealna za većinu odraslih osoba.</li>
  <li><strong>Prekomerna telesna težina (25 - 29.9):</strong> Osobe sa BMI-jem u ovom opsegu mogu imati višak telesne mase, što može povećati rizik od bolesti poput dijabetesa tipa 2 i bolesti srca.</li>
  <li><strong>Gojaznost (BMI ≥ 30):</strong> Ova kategorija označava gojaznost, koja može povećati rizik od ozbiljnih zdravstvenih problema.</li>
  <li><strong>Teška gojaznost (BMI ≥ 40):</strong> Osobe sa BMI-jem većim od 40 imaju veoma visok rizik od ozbiljnih zdravstvenih problema, uključujući bolesti srca, dijabetes i druge komplikacije.</li>
</ul>
        </div>

        <div 
          className="card shadow-lg p-4" 
          style={{ 
            maxWidth: '400px', 
            width: '100%', 
            backgroundColor: '#ffffff', 
            borderRadius: '10px', 
            marginLeft: '50px', 
            alignSelf: 'flex-start', 
            marginTop: '50px',
            
          }}
        >
          <h2 className="text-center mb-4" style={{ color: '#2d6a4f' }}>Izračunajte svoj BMI</h2>
          <p className="text-center text-muted">Unesite svoju visinu i težinu da biste izračunali BMI.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#2d6a4f' }}>Visina (cm)</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Unesite visinu u cm"
                style={{ borderColor: '#2d6a4f' }}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#2d6a4f' }}>Težina (kg)</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Unesite težinu u kg"
                style={{ borderColor: '#2d6a4f' }}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="btn w-100" 
              style={{ backgroundColor: '#2d6a4f', color: '#ffffff' }}
            >
              Izračunaj
            </button>
          </form>

          {/* Display BMI result if available */}
          {bmiResult && (
            <div className="mt-4">
              <h4>BMI: {bmiResult.bmi}</h4>
              <p>Kategorija: {bmiResult.bmiCategoryForAdults.category}</p>
              <p>Opseg: {bmiResult.bmiCategoryForAdults.range}</p>
              <p>Normalni opseg: {bmiResult.bmiCategoryForAdults.normalRange}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BMICalculatorPage
