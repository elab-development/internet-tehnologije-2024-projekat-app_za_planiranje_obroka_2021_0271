import React, { useState } from 'react';
import registerPhoto from "../Images/food-reg.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
  const [userData, setUserData] = useState({
    ime: "",
    prezime: "",
    korisnicko_ime: "",
    email: "",
    sifra: "",
    ponovljenaSifra: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleInput(e) {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (userData.sifra !== userData.ponovljenaSifra) {
      setError("Lozinke se ne poklapaju.");
      toast.error("Lozinke se ne poklapaju.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeButton: true,
        theme: "colored",
        style: {
          backgroundColor: "#f44336",
          color: "white",
          borderRadius: "8px",
          padding: "10px"
        }
      });
      return;
    }

    axios
      .post("api/register", userData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Uspešno ste se registrovali!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeButton: true,
            theme: "colored",
            style: {
              backgroundColor: "#4caf50", 
              color: "white",
              borderRadius: "8px",
              padding: "10px"
            }
           
          });
          setTimeout(() => {
            navigate("/login");
          }, 1000); 
        } else {
          setError("Neuspešna registracija.");
          toast.error("Neuspešna registracija.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeButton: true,
            theme: "colored",
            style: {
              backgroundColor: "#f44336",
              color: "white",
              borderRadius: "8px",
              padding: "10px"
            }
          });
        }
      })
      .catch(() => {
        setError("Greška prilikom registracije.");
        toast.error("Greška prilikom registracije.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeButton: true,
          theme: "colored",
          style: {
            backgroundColor: "#f44336",
            color: "white",
            borderRadius: "8px",
            padding: "10px"
          }
        });
      });
  }

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage: `url(${registerPhoto})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div
                  className="card-body p-5"
                  style={{
                    backgroundColor: "#d4edda",
                    borderRadius: "15px",
                  }}
                >
                  <h2 className="text-uppercase text-center mb-5">Napravite profil</h2>

                  <form onSubmit={handleRegister}>
                    <div className="row mb-4">
                      <div className="col-6">
                        <div className="form-outline">
                          <input
                            name="ime"
                            type="text"
                            id="ime"
                            className="form-control form-control-lg"
                            style={{ backgroundColor: "#f1f1f1", color: "black" }}
                            onChange={handleInput}
                          />
                          <label className="form-label" htmlFor="ime" style={{ color: "black" }}>
                            Ime
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-outline">
                          <input
                            name="prezime"
                            type="text"
                            id="prezime"
                            className="form-control form-control-lg"
                            style={{ backgroundColor: "#f1f1f1", color: "black" }}
                            onChange={handleInput}
                          />
                          <label className="form-label" htmlFor="prezime" style={{ color: "black" }}>
                            Prezime
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-6">
                        <div className="form-outline">
                          <input
                            name="email"
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            style={{ backgroundColor: "#f1f1f1", color: "black" }}
                            onChange={handleInput}
                          />
                          <label className="form-label" htmlFor="email" style={{ color: "black" }}>
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-outline">
                          <input
                            name="korisnicko_ime"
                            type="text"
                            id="korisnickoIme"
                            className="form-control form-control-lg"
                            style={{ backgroundColor: "#f1f1f1", color: "black" }}
                            onChange={handleInput}
                          />
                          <label className="form-label" htmlFor="korisnickoIme" style={{ color: "black" }}>
                            Korisnicko ime
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-6">
                        <div className="form-outline">
                          <input
                            name="sifra"
                            type="password"
                            id="sifra"
                            className="form-control form-control-lg"
                            style={{ backgroundColor: "#f1f1f1", color: "black" }}
                            onChange={handleInput}
                          />
                          <label className="form-label" htmlFor="sifra" style={{ color: "black" }}>
                            Šifra
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-outline">
                          <input
                            name="ponovljenaSifra"
                            type="password"
                            id="sifraRepeat"
                            className="form-control form-control-lg"
                            style={{ backgroundColor: "#f1f1f1", color: "black" }}
                            onChange={handleInput}
                          />
                          <label className="form-label" htmlFor="sifraRepeat" style={{ color: "black" }}>
                            Ponovite šifru
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mb-4">
                      <button
                        type="submit"
                        className="btn btn-lg gradient-custom-4 text-body"
                        style={{
                          padding: "15px 50px",
                          fontSize: "18px",
                          background: "linear-gradient(to right, #4caf50, #2e7d32)",
                          border: "none",
                          borderRadius: "30px",
                          color: "white",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        Registrujte se
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Već imate profil?{" "}
                      <Link to="/login" className="fw-bold text-body" style={{ fontSize: "min(1vw, 1.8vh)" }}>
                        <u>Prijavite se ovde</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default RegisterPage;
