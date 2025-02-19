import React from 'react'
import loginPhoto from "../Images/slika.jpg";

function LoginPage() {
  return (
    <section className="vh-100 d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(to right, #2E7D32, #66BB6A, #A5D6A7)" }}>
      <div className="card d-flex flex-row" style={{ borderRadius: "1rem", width: "50%" }}>
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={loginPhoto}
            alt="forma za prijavu"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover", borderRadius: "1rem 0 0 1rem" }}
          />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
          <div className="card-body text-black">
            <h2 className="text-center mb-4">Dobrodošli na našu aplikaciju o obrocima</h2>
            <form>
              <div className="form-outline mb-4">
                <input type="email" id="email" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="email">Email adresa</label>
              </div>
              <div className="form-outline mb-4">
                <input type="password" id="sifra" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="sifra">Šifra</label>
              </div>
              <div className="pt-1 mb-4">
                <button className="btn btn-dark btn-lg btn-block" type="button">
                  Prijavi se
                </button>
              </div>
              <a className="small text-muted" href="#">Zaboravljena šifra?</a>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Nemate nalog? <a href="#" style={{ color: "#393f81" }}>Registrujte se ovde</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
