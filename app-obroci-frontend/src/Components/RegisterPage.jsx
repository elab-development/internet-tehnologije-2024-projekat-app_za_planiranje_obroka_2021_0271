import React from 'react'
import registerPhoto from "../Images/food-reg.jpeg";
function RegisterPage() {
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
                backgroundColor: "#d4edda", // Light green background
                borderRadius: "15px",
              }}
            >
              <h2 className="text-uppercase text-center mb-5">Napravite profil</h2>

              <form>
                <div className="row mb-4">
                  <div className="col-6">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="ime"
                        className="form-control form-control-lg"
                        style={{ backgroundColor: "#f1f1f1", color: "black" }} // Light gray background
                      />
                      <label className="form-label" htmlFor="ime" style={{ color: "black" }}>
                        Ime
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="prezime"
                        className="form-control form-control-lg"
                        style={{ backgroundColor: "#f1f1f1", color: "black" }}
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
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        style={{ backgroundColor: "#f1f1f1", color: "black" }}
                      />
                      <label className="form-label" htmlFor="email" style={{ color: "black" }}>
                        Email
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="korisnickoIme"
                        className="form-control form-control-lg"
                        style={{ backgroundColor: "#f1f1f1", color: "black" }}
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
                        type="password"
                        id="sifra"
                        className="form-control form-control-lg"
                        style={{ backgroundColor: "#f1f1f1", color: "black" }}
                      />
                      <label className="form-label" htmlFor="sifra" style={{ color: "black" }}>
                        Šifra
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-outline">
                      <input
                        type="password"
                        id="sifraRepeat"
                        className="form-control form-control-lg"
                        style={{ backgroundColor: "#f1f1f1", color: "black" }}
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
                  <a href="#!" className="fw-bold text-body">
                    <u>Prijavite se ovde</u>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

)
}

export default RegisterPage

