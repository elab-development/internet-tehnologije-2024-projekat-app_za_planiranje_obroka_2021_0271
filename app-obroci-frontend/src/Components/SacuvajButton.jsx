import React from 'react';

function SacuvajButton({ tekst, clickFunction }) {  // Destructure props properly
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        height: '15vh' 
    }}>
        <button 
            style={{
                marginTop: '5px',
                padding: '10px 20px',
                fontSize: '16px',
                color: '#fff',
                backgroundColor: '#8c9c8e',
                border: 'none',
                borderRadius: '5px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
            }}
            onClick={clickFunction}
        >
            {tekst}
        </button>
    </div>
  );
}

export default SacuvajButton;
