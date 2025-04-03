import axios from 'axios';
import React, { useState } from 'react'
import { IoBody } from "react-icons/io5";



function BMICalculatorPage() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);


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
      minHeight: '100vh', 
      margin: 0, 
      padding: '10px 15px 30px 15px', 
      width: '100%',
    }}
  >
    <h1
      style={{
        color: '#2d6a4f', 
        fontSize: 'clamp(24px, 5vw, 40px)', 
        fontWeight: 'bold', 
        marginTop: '20px',  
        marginBottom: '30px',
        textAlign: 'center', 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
    >
      BMI Kalkulator
      <IoBody style={{ marginLeft: '10px' }} />
    </h1>

    <div 
      className="d-flex flex-column flex-md-row align-items-center justify-content-center" 
      style={{ width: '100%', gap: '20px' }}
    >
    
      <div 
        className="card shadow-lg p-4 mb-4 mb-md-0" 
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          backgroundColor: '#ffffff', 
          borderRadius: '10px',
          order: 1
        }}
      >
        <h2 
          className="text-center mb-3" 
          style={{ 
            color: '#2d6a4f', 
            fontSize: 'clamp(18px, 4vw, 24px)' 
          }}
        >
          Izračunajte svoj BMI
        </h2>
        <p 
          className="text-center text-muted" 
          style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}
        >
          Unesite svoju visinu i težinu da biste izračunali BMI.
        </p>
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

        
        {bmiResult && (
          <div className="mt-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4 style={{ color: '#2d6a4f' }}>BMI: {bmiResult.bmi}</h4>
            <p style={{ marginBottom: '5px' }}>
              <strong>Kategorija:</strong> {bmiResult.bmiCategoryForAdults.category}
            </p>
            <p style={{ marginBottom: '5px' }}>
              <strong>Opseg:</strong> {bmiResult.bmiCategoryForAdults.range}
            </p>
            <p style={{ marginBottom: '0' }}>
              <strong>Normalni opseg:</strong> {bmiResult.bmiCategoryForAdults.normalRange}
            </p>
          </div>
        )}
      </div>

     
      <div 
        className="text-center mb-4" 
        style={{
          width: '100%',
          backgroundColor: '#ffffff',  
          borderRadius: '20px',     
          padding: '20px',             
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  
          maxWidth: '600px',
          order: 2          
        }}
      >
        <h3 
          style={{ 
            color: '#2d6a4f', 
            fontSize: 'clamp(18px, 4vw, 24px)',
            marginBottom: '15px'
          }}
        >
          Kategorije BMI-ja
        </h3>
        <ul 
          style={{ 
            color: '#2d6a4f', 
            fontSize: 'clamp(14px, 3vw, 16px)', 
            lineHeight: '1.6',
            textAlign: 'left',
            paddingLeft: '20px'
          }}
        >
          <li><strong>Premala telesna težina (BMI {"<"} 18.5):</strong> Osobe sa BMI-jem ispod 18.5 mogu imati premalu telesnu masu, što može povećati rizik od raznih zdravstvenih problema.</li>
          <li><strong>Normalna telesna težina (18.5 - 24.9):</strong> Ova kategorija označava normalnu telesnu masu koja je idealna za većinu odraslih osoba.</li>
          <li><strong>Prekomerna telesna težina (25 - 29.9):</strong> Osobe sa BMI-jem u ovom opsegu mogu imati višak telesne mase, što može povećati rizik od bolesti poput dijabetesa tipa 2 i bolesti srca.</li>
          <li><strong>Gojaznost (BMI ≥ 30):</strong> Ova kategorija označava gojaznost, koja može povećati rizik od ozbiljnih zdravstvenih problema.</li>
          <li><strong>Teška gojaznost (BMI ≥ 40):</strong> Osobe sa BMI-jem većim od 40 imaju veoma visok rizik od ozbiljnih zdravstvenih problema, uključujući bolesti srca, dijabetes i druge komplikacije.</li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default BMICalculatorPage