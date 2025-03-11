import { Link } from "react-router-dom";
import { RiLeafFill } from "react-icons/ri";

function NavBar() {
  return (
    <nav 
      className="navbar navbar-expand-lg" 
      style={{ 
        backgroundColor: "rgba(178, 246, 175, 0.8)", 
        backdropFilter: "blur(8px)", 
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
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

        <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {/* Navigation Links with Hover Effect */}
            <Link 
              className="nav-link"
              to="/"
              style={{
                transition: "color 0.3s", 
                color: "#388E3C"
              }}
              onMouseEnter={e => e.target.style.color = "#60D394"} // Hover color
              onMouseLeave={e => e.target.style.color = "#388E3C"} // Reset color
            >
              Pocetna
            </Link>
            <Link 
              className="nav-link"
              to="/recepti"
              style={{
                transition: "color 0.3s", 
                color: "#388E3C"
              }}
              onMouseEnter={e => e.target.style.color = "#60D394"} 
              onMouseLeave={e => e.target.style.color = "#388E3C"}
            >
              Recepti
            </Link>
            <Link 
              className="nav-link"
              to="/obroci"
              style={{
                transition: "color 0.3s", 
                color: "#388E3C"
              }}
              onMouseEnter={e => e.target.style.color = "#60D394"} 
              onMouseLeave={e => e.target.style.color = "#388E3C"} 
            >
              Obroci
            </Link>
          </div>

          {/* Login Link */}
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/login">Prijavi se</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;