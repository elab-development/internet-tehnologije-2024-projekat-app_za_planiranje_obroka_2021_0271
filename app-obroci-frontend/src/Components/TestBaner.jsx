import React from 'react'
import banerPhoto from "../Images/welcome.png";

function TestBaner() {
    return (
        <div
          className="d-flex justify-content-center align-items-center banner"
          style={{
            minHeight: "50vh",
            backgroundImage: `url(${banerPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <h2
            style={{
              position: "absolute",
              color: "white",
            }}
          >
            Test Baner
          </h2>
        </div>
      );
}

export default TestBaner
