import { Link, useNavigate } from "react-router-dom";
import { RiLeafFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios"; 

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [korisnik, setKorisnik] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const navigate = useNavigate();


  useEffect(() => {
    const token = window.sessionStorage.getItem("auth_token");
    const korisnikId = window.sessionStorage.getItem("id");
 
    if (token) {
      setIsLoggedIn(true);
      axios.get(`/api/korisnici/${korisnikId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        setKorisnik(response.data.korisnik);
    })
    .catch((error) => {
        console.error("Greška pri dohvatanju podataka:", error);
    });
      const storedUsername = window.sessionStorage.getItem("username");
      setUsername(storedUsername || "Korisnik");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "api/logout",  
        {},  
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.sessionStorage.getItem("auth_token")}`,
          },
        }
      );

      if (response.status === 200) {
        
        window.sessionStorage.removeItem("auth_token");
        window.sessionStorage.removeItem("username");

        setIsLoggedIn(false);  
        navigate("/login");  
      } else {
        alert(response.data.Poruka || "Greška prilikom izlogovanja.");
      }
    } catch (error) {
      console.error("Greška pri logoutu:", error);
      alert("Došlo je do greške. Pokušajte ponovo.");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);  
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "rgba(178, 246, 175, 0.8)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: "9999"
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <RiLeafFill style={{ fontSize: "30px", marginRight: "8px", color: "#388E3C" }} />
          <span>NutriPlan</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse show" id="navbarNavAltMarkup" >
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Pocetna</Link>
            <Link className="nav-link" to="/recepti">Recepti</Link>
            {isLoggedIn ? (
             <Link className="nav-link" to="/obroci">Obroci</Link>
            ) : (
              <Link className="nav-link" to="/login">Obroci</Link>
            )}
            <Link className="nav-link" to="/BMICalculator">BMI</Link>
          </div>
            



          

          
          <div className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <div className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  type="button"
                  id="navbarDropdown"
                  aria-expanded={dropdownOpen ? "true" : "false"}
                  onClick={toggleDropdown}
                  style={{ color: "#388E3C" }}
                
                >
                  {username}
                </button>
                <ul
                className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
                style={{
                  position: "absolute",
                top: "100%", 
                left: "0",
                zIndex: "9999", 
                backgroundColor: "rgba(178, 246, 175, 0.95)",
                border: "1px solid #a8e6cf",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                minWidth: "130px",
                padding: "8px 0",
                }}
                  >

                <li>
                {korisnik.uloga === "admin" ? <Link className="dropdown-item" to="/admin">Admin panel</Link> : null}
                </li>
                <li>
                <Link className="dropdown-item" to="/profil">Moj Profil</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                <button className="dropdown-item" onClick={handleLogout}>Odjavi se</button>
                </li>
                </ul>
              </div>
            ) : (
              <Link className="nav-link" to="/login">Prijavi se</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
