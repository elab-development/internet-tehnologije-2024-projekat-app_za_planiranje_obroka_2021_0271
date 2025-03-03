import React, { useState } from 'react'
import loginPhoto from "../Images/slika.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [userData, setUserData]= useState ({
    email:"",
    sifra:""
  });
  let navigate = useNavigate();
  function handleInput(e) {
    let newUserData = userData;
    console.log(newUserData);
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
    console.log(newUserData);
  }

  function handleLogin(e) {
    e.preventDefault();
    
    axios
        .post("api/login", userData)
        .then((res) => {
         
            console.log(res.data);
            if (res.data.success === true) {
                window.sessionStorage.setItem("auth_token", res.data.access_token);
                
                navigate("/");
            }
        })
        .catch((e) => {
            console.log('Error:', e);
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
            <h2 className="mb-4" style={{ fontSize: "min(2vw, 3vh)" }}>Dobrodošli na našu aplikaciju o obrocima</h2>
            <form onSubmit={handleLogin}>
              <div className="form-outline mb-4">
                <input name="email" type="email" id="email" className="form-control form-control-lg" style={{ fontSize: "min(1.2vw, 2vh)" }} onInput={handleInput}/>
                <label className="form-label" htmlFor="email" style={{ fontSize: "min(1vw, 1.8vh)" }}>Email adresa</label>
              </div>
              <div className="form-outline mb-4">
                <input name="sifra" type="password" id="sifra" className="form-control form-control-lg" style={{ fontSize: "min(1.2vw, 2vh)" }}  onInput={handleInput}/>
                <label className="form-label" htmlFor="sifra" style={{ fontSize: "min(1vw, 1.8vh)" }}>Šifra</label>
              </div>
              <div className="pt-1 mb-4">
                <button className="btn btn-dark btn-lg btn-block" type="submit" style={{ fontSize: "min(1.2vw, 2vh)" }}>
                  Prijavi se
                </button>
              </div>
              <a className="small text-muted" href="#" style={{ fontSize: "min(0.9vw, 1.6vh)" }}>Zaboravljena šifra?</a>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81", fontSize: "min(1vw, 1.8vh)" }}>
                Nemate nalog? <a href="#" style={{ color: "#393f81", fontSize: "min(1vw, 1.8vh)" }}>Registrujte se ovde</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
