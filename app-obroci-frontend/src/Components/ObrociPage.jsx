import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Obrok from './Obrok';

const ObrociPage = () => {
  const [meals, setMeals] = useState({});
  const [receptMap, setReceptMap] = useState({});
  const navigate = useNavigate();

  const getSerbianWeekdayNames = () => {
    const englishToSerbian = {
      Monday: "Ponedeljak",
      Tuesday: "Utorak",
      Wednesday: "Sreda",
      Thursday: "Četvrtak",
      Friday: "Petak",
      Saturday: "Subota",
      Sunday: "Nedelja",
    };

    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(new Date(), i);
      const englishDay = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(date);
      return englishToSerbian[englishDay] || englishDay;
    });
  };

  const weekDays = getSerbianWeekdayNames().map((day, i) => {
    const date = addDays(new Date(), i);
    return {
      label: `${day} ${format(date, "d.M.yyyy")}`,
      key: format(date, "yyyy-MM-dd"),
    };
  });

  const addMeal = (dayKey) => {
    navigate("/dodajObrok", {
      state: { selectedDate: dayKey },
    });
  };

  const fetchData = async () => {
    const token = window.sessionStorage.getItem("auth_token");
    const userId = window.sessionStorage.getItem("id");

    if (!token || !userId) {
      console.error("Korisnik nije prijavljen.");
      return;
    }

    try {
      const receptiRes = await axios.get("/api/recepti");
      const recepti = receptiRes.data.data || [];
      const map = {};
      recepti.forEach((r) => {
        map[r.id] = r.naziv;
      });
      setReceptMap(map);

      const obrociRes = await axios.get("/api/obroci", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const obroci = obrociRes.data.data || [];

      const grouped = {};
      obroci.forEach((obrok) => {
        if (!obrok.korisnik || String(obrok.korisnik.id) !== String(userId)) return;
        if (!obrok.datum) return;

        const key = format(new Date(obrok.datum), "yyyy-MM-dd");
        if (!grouped[key]) grouped[key] = [];

        grouped[key].push({
          type: obrok.tip,
          recept: obrok.recept,
        });
      });

      setMeals(grouped);
    } catch (error) {
      console.error("Greška prilikom učitavanja podataka:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="justify-center items-center" style={{overflowY: "auto", paddingTop: "4%", paddingLeft: "1%", paddingRight: "1%", backgroundColor: "rgba(178, 246, 175, 0.8)", minHeight: "100vh",}} >
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th key={day.key}>{day.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekDays.map((day) => (
              <td key={day.key}>
                <div
                  style={{
                    minHeight: "50vh",
                    maxHeight: "50vh",
                    overflowY: "auto",
                    minWidth: "13vw",
                    maxWidth: "13vw",
                    overflowX: "auto",
                    marginBottom: "8%"
                  }}
                >
                  {meals[day.key]?.length > 0 ? (
                    meals[day.key].map((meal, index) => (
                      <Obrok key={index} tip={meal.type} recept={meal.recept} />
                    ))
                  ) : (
                    <span style={{ color: "#888" }}>Nema obroka</span>
                  )}
                </div>
                <button
                  onClick={() => addMeal(day.key)}
                  className="mt-2 p-2 text-white rounded"
                  style={{
                    backgroundColor: '#66bb6a', border: 'none', marginTop: "8%", marginBottom: "8%"}}
                >
                  Dodaj obrok
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ObrociPage;
