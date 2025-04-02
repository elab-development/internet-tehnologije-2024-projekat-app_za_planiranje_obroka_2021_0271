import React, { useEffect, useState } from "react";
import { RiLeafFill, RiAlarmWarningFill, RiFileTextFill } from "react-icons/ri"; // Icons
import banerPhoto from "../Images/welcome.png";
import cookingPhoto from "../Images/cooking.jpeg";
import HomePageDescription from "./HomePageDescription";
import { Link } from "react-router-dom"; 
import FAQCard from "./FAQcards";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { FaQuestion } from "react-icons/fa";

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = window.sessionStorage.getItem("auth_token");
    const username = window.sessionStorage.getItem("username");
    if(token){
      setIsLoggedIn(true);
      setUsername(username);
    }else{
      setIsLoggedIn(false);
      setUsername("");

    }
  }, []);
  return (
    <div
      style={{
        backgroundColor: "rgba(178, 246, 175, 0.8)",
        minHeight: "100vh",
         
      }}
    >
     
      <div
        className="d-flex justify-content-center align-items-center banner"
        style={{
          minHeight: "24vh",
          position: "relative", 
          zIndex: 0,
        }}
      >

        <div
          style={{
            position: "absolute",
            textAlign: "center",
            color: "#fff", 
            zIndex: 1,
            padding: "20px",
            borderRadius: "10px",
          }}
        >

{isLoggedIn ? (
  <h2  style={{
    fontSize: "min(4vw, 5vh)",
    fontWeight: "bold",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 2)", 
  }}>Dobrodošli {username}!</h2>
) : (
  <div>
    <h2
      style={{
        fontSize: "min(4vw, 5vh)",
        fontWeight: "bold",
        textShadow: "2px 2px 5px rgba(0, 0, 0, 2)", 
      }}
    >
      Prijavi se da počneš da planiraš svoje obroke!
    </h2>
    <p
      style={{
        fontSize: "1.2em",
        textShadow: "1px 1px 3px rgba(0, 0, 0, 2)", 
      }}
    >
      Planiraj, prati i unapredi svoju ishranu uz NutriPlan.
    </p>
    <Link to="/login">
      <button
        style={{
          padding: "12px 24px",
          fontSize: "1.2em",
          backgroundColor: "#388E3C", 
          border: "none",
          color: "#fff",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2C6F2A")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#388E3C")}
      >
        Prijavi se
      </button>
    </Link>
  </div>
)}

        </div>
      </div>

      
      <div className="container py-5">
      
        <h2
          className="text-center mb-4"
          style={{
            fontSize: "min(5vw, 6vh)",
            color: "#388E3C", 
          }}
        >
          Dobrodošli na{" "}
          <span style={{ marginRight: "8px" }}>NutriPlan!</span>
          <RiLeafFill
            style={{ fontSize: "40px", marginLeft: "8px", color: "#388E3C" }}
          />
        </h2>
          <br />
       
        <div className="row">
          <div className="col-md-4">
            <HomePageDescription
              title="Šta je NutriPlan?"
              content={
                <>
                  <div>
                    <p>
                      NutriPlan vam pomaže da pratite ishranu i organizujete obroke na osnovu vaših ciljeva i preferencija.
                    </p>
                    <p>
                      Sajt omogućava personalizaciju plana ishrane, praćenje kalorijskog unosa i omogućava vam da pratite napredak prema vašim ciljevima.
                    </p>
                    <p>
                      Takođe, možete pratiti sve promene i unapređenja kroz detaljan izvještaj o vašim navikama i napretku.
                    </p>
                  </div>
                </>
              }
              icon={<RiLeafFill />} 
            />
          </div>
          <div className="col-md-4">
            <HomePageDescription
              title="Planiranje obroka"
              content={
                <>
                  <div>
                    <p>
                      Naša aplikacija omogućava lako planiranje obroka i generisanje shopping listi sa namirnicama.
                    </p>
                    <p>
                      Na osnovu vaših preferencija i ciljeva, možete kreirati sedmične obroke koji vam pomažu da održite zdravu ishranu.
                    </p>
                    <p>
                      Takođe, možete filtrirati recepte prema specifičnim potrebama kao što su veganski, bezglutenski ili keto. Sve liste su jednostavne za praćenje.
                    </p>
                  </div>
                </>
              }
              icon={<RiAlarmWarningFill />} 
            />
          </div>
          <div className="col-md-4">
            <HomePageDescription
              title="Nutritivne vrednosti"
              content={
                <>
                  <div>
                    <p>
                      Pratite nutritivne vrednosti i prilagodite ishranu prema vašim potrebama za zdravlje i energiju.
                    </p>
                    <p>
                      NutriPlan vam pruža detaljan uvid u kalorije, vitamine, minerale i sve nutritivne vrednosti koje unosite tokom dana.
                    </p>
                    <p>
                      Možete pratiti kako određene promene u ishrani utiču na vašu energiju i zdravlje, i prilagoditi planove za optimalne rezultate.
                    </p>
                  </div>
                </>
              }
              icon={<RiFileTextFill />} 
            />
          </div>
        </div>
      </div>

      <style>
        {`
          .banner {
            background-image: url(${banerPhoto});
            background-size: cover;
            background-position: center;
            height: 50vh; 
            margin-top: 0; 
          }
        `}
      </style>

      <div className="container py-5">
        <h2
          className="text-center mb-4"
          style={{
            fontSize: "min(5vw, 6vh)",
            color: "#388E3C",
          }}
        >
          Često postavljana pitanja (FAQ)
        </h2>
        <br />
        <div className="row">
          <div className="col-md-4">
            <FAQCard
              question="Kako da započnem sa planiranjem obroka?"
              answer="Prijavite se na NutriPlan i počnite sa kreiranjem svog personalizovanog plana ishrane. Na osnovu vaših ciljeva moći ćete da planirate obroke."
            />
          </div>
          <div className="col-md-4">
            <FAQCard
              question="Da li mogu da unosim alergije u aplikaciju?"
              answer="Da, aplikacija omogućava dodavanje alergija i drugih specifičnih prehrambenih potreba, kako bi se planirali obroci koji su bezbedni za vas."
            />
          </div>
          <div className="col-md-4">
            <FAQCard
              question="Mogu li da pratim nutritivne vrednosti?"
              answer="Da, NutriPlan vam omogućava da pratite kalorije, vitamine, minerale i druge nutritivne vrednosti koje unosite tokom dana."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
