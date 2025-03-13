import React, { useState } from 'react';
import loginPhoto from "../Images/slika.jpg";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { RiLeafFill } from "react-icons/ri";

function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    sifra: ""
  });

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleInput(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    setError(false); 

    axios
      .post("api/login", userData)
      .then((res) => {
        if (res.data.success === true) {
          window.sessionStorage.setItem("auth_token", res.data.access_token);
          window.sessionStorage.setItem("username", res.data.korisnik.korisnicko_ime);
          navigate("/");
        }
      })
      .catch(() => {
        setError(true); 
      });
  }

  return (
    <section className="vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(to right, #2E7D32, #66BB6A, #A5D6A7)" }}>
      <div className="card d-flex flex-row" style={{ borderRadius: "1rem", width: "50%", height: "80vh" }}>
        <div className="col-md-6 d-none d-md-block p-0" style={{ height: "100%" }}>
          <img
            src={loginPhoto}
            alt="forma za prijavu"
            className="img-fluid w-100"
            style={{ objectFit: "cover", height: "100%", borderRadius: "1rem 0 0 1rem" }}
          />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
          <div className="card-body text-black text-center" style={{ width: "100%" }}>
          <h1 className="mb-4" style={{ fontSize: "min(2vw, 3vh)" }}>
              Dobrodošli na{" "}
              NutriPlan aplikaciju!
            <RiLeafFill style={{ fontSize: "30px", marginRight: "8px", color: "#388E3C" }} />
             
            </h1>
            {error && <p className="text-danger">Pogrešan email ili šifra</p>} {/* Error message */}
            <form onSubmit={handleLogin}>
              <div className="form-outline mb-4">
                <input 
                  name="email" 
                  type="email" 
                  id="email" 
                  className={`form-control form-control-lg ${error ? 'border-danger' : ''}`} 
                  style={{ fontSize: "min(1.2vw, 2vh)" }} 
                  onChange={handleInput} 
                />
                <label className="form-label" htmlFor="email" style={{ fontSize: "min(1vw, 1.8vh)" }}>Email adresa</label>
              </div>
              <div className="form-outline mb-4">
                <input 
                  name="sifra" 
                  type="password" 
                  id="sifra" 
                  className={`form-control form-control-lg ${error ? 'border-danger' : ''}`} 
                  style={{ fontSize: "min(1.2vw, 2vh)" }}  
                  onChange={handleInput} 
                />
                <label className="form-label" htmlFor="sifra" style={{ fontSize: "min(1vw, 1.8vh)" }}>Šifra</label>
              </div>
              <div className="pt-1 mb-4">
                <button className="btn btn-dark btn-lg btn-block" type="submit" style={{ fontSize: "min(1.2vw, 2vh)" }}>
                  Prijavi se
                </button>
              </div>
              <Link to="/forgot_password" className="small text-muted" style={{ fontSize: "min(0.9vw, 1.6vh)" }}>Zaboravljena šifra?</Link>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81", fontSize: "min(1vw, 1.8vh)" }}>
                Nemate nalog? <Link to="/register" style={{ color: "#393f81", fontSize: "min(1vw, 1.8vh)", textDecoration: "none" }}>Registrujte se ovde</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;