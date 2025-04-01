import React from 'react'
import { IoBody } from "react-icons/io5";

function BMICalculatorPage() {
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
    {/* Header at the top of the page */}
    <h1
      style={{
        color: '#2d6a4f', 
        fontSize: '40px', 
        fontWeight: 'bold', 
        marginTop: '30px',  // Adds space from the top
        marginBottom: '60px',
        textAlign: 'center', // Ensures the header is centered
        width: '100%'
      }}
    >
      BMI Kalkulator
      <IoBody style={{ marginLeft: '10px' }} />
    </h1>
    
    {/* Container for the text and calculator, using flex to arrange them side by side */}
    <div className="d-flex align-items-center" style={{ width: '80%', maxWidth: '1200px' }}>
      {/* Left side - Text content */}
      <div className="text-center mb-5" style={{ flex: 1 }}>
        <p 
          style={{
            color: '#2d6a4f', 
            fontSize: '18px', 
            maxWidth: '600px', 
            margin: '0 auto', 
            lineHeight: '1.6'
          }}
        >
          BMI (Body Mass Index) je jednostavan alat koji pomaže u proceni količine telesne masti na osnovu vaše visine i težine. Ovaj indeks je koristan za identifikovanje potencijalnih rizika za zdravlje povezane s prekomernom težinom, gojaznošću ili niskom telesnom masom. 
          <br /><br />
          BMI nije savršen pokazatelj zdravlja, ali može vam pomoći da pratite svoj telesni sastav i da prepoznate kada je potrebno konsultovati se sa stručnjakom. Takođe, može vam dati uputstva kako da poboljšate svoj način života i postignete optimalnu telesnu težinu.
        </p>
      </div>
  
      {/* Right side - Calculator */}
      <div 
        className="card shadow-lg p-4" 
        style={{ 
          maxWidth: '400px', 
          width: '100%', 
          backgroundColor: '#ffffff', 
          borderRadius: '10px', 
          marginLeft: '50px' // Added left margin to push it to the right
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#2d6a4f' }}>Izračunajte svoj BMI</h2>
        <p className="text-center text-muted">Unesite svoju visinu i težinu da biste izračunali BMI.</p>
        <div className="mb-3">
          <label className="form-label" style={{ color: '#2d6a4f' }}>Visina (cm)</label>
          <input 
            type="number" 
            className="form-control" 
            placeholder="Unesite visinu u cm"
            style={{ borderColor: '#2d6a4f' }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" style={{ color: '#2d6a4f' }}>Težina (kg)</label>
          <input 
            type="number" 
            className="form-control" 
            placeholder="Unesite težinu u kg"
            style={{ borderColor: '#2d6a4f' }}
          />
        </div>
        <button 
          className="btn w-100" 
          style={{ backgroundColor: '#2d6a4f', color: '#ffffff' }}
        >
          Izračunaj
        </button>
      </div>
    </div>
  </div>
  )
}

export default BMICalculatorPage
