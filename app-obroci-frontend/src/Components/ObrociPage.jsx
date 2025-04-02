import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Obrok from "./Obrok";
import { FaTrashAlt } from "react-icons/fa";

const ObrociPage = () => {
  const [meals, setMeals] = useState({});
  const [shoppingList, setShoppingList] = useState("");
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
      const obrociRes = await axios.get("/api/obroci", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const obroci = obrociRes.data.data || [];
      const grouped = {};

      obroci.forEach((obrok) => {
        if (!obrok.korisnik || String(obrok.korisnik.id) !== String(userId)) return;
        if (!obrok.datum) return;

        const key = format(new Date(obrok.datum), "yyyy-MM-dd");
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push({
          id: obrok.id,
          type: obrok.tip,
          recept: obrok.recept,
        });
      });

      setMeals(grouped);
    } catch (error) {
      console.error("Greška prilikom učitavanja podataka:", error);
    }
  };

  const fetchShoppingList = async () => {
    const token = window.sessionStorage.getItem("auth_token");
    const userId = window.sessionStorage.getItem("id");

    if (!token || !userId) return;

    try {
      const today = new Date();
      const endDate = addDays(today, 6);

      const obrociRes = await axios.get("/api/obroci", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const obroci = obrociRes.data.data.filter((obrok) => {
        const obrokDate = new Date(obrok.datum);
        return (
          obrok.korisnik &&
          String(obrok.korisnik.id) === String(userId) &&
          obrokDate >= today &&
          obrokDate <= endDate
        );
      });

      const receptIds = obroci.map((o) => o.recept.id);
      const receptCount = receptIds.reduce((map, id) => {
        map[id] = (map[id] || 0) + 1;
        return map;
      }, {});

      const namirnicaMap = {};

      for (const receptId in receptCount) {
        const times = receptCount[receptId];
        const res = await axios.get(`/api/recepti/${receptId}/namirnice`);
        const data = res.data.data;

        data.forEach((entry) => {
          const naziv = entry.namirnica.naziv;
          const kolicina = entry.kolicina * times;

          if (namirnicaMap[naziv]) {
            namirnicaMap[naziv] += kolicina;
          } else {
            namirnicaMap[naziv] = kolicina;
          }
        });
      }

      const finalList = Object.entries(namirnicaMap)
        .map(([naziv, kolicina]) => `${naziv}: ${kolicina}g`)
        .join(", ");

      setShoppingList(finalList);
    } catch (error) {
      console.error("Greška prilikom dohvata liste za kupovinu:", error);
    }
  };

  const handleDeleteMeal = async (mealId, dayKey) => {
    const token = window.sessionStorage.getItem("auth_token");
    if (!token) {
      console.error("Korisnik nije prijavljen.");
      return;
    }

    try {
      await axios.delete(`/api/obroci/${mealId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMeals((prevMeals) => {
        const newMeals = { ...prevMeals };
        newMeals[dayKey] = newMeals[dayKey].filter((m) => m.id !== mealId);
        return newMeals;
      });

      fetchShoppingList();
    } catch (error) {
      console.error("Greška prilikom brisanja obroka:", error);
      alert("Došlo je do greške pri brisanju obroka.");
    }
  };

  useEffect(() => {
    fetchData();
    fetchShoppingList();
  }, []);

  return (
    <div
      className="justify-center items-center"
      style={{
        overflowY: "auto",
        paddingTop: "4%",
        paddingLeft: "1%",
        paddingRight: "1%",
        backgroundColor: "rgba(178, 246, 175, 0.8)",
        minHeight: "100vh"
      }}
    >
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
                    marginBottom: "8%",
                    position: "relative",
                  }}
                >
                  {meals[day.key]?.length > 0 ? (
                    meals[day.key].map((meal) => (
                      <div key={meal.id} style={{ position: "relative", marginBottom: "10px" }}>
                        <Obrok tip={meal.type} recept={meal.recept} />
                        <FaTrashAlt
                          onClick={() => {
                            const confirmed = window.confirm("Da li ste sigurni da želite da obrišete ovaj obrok?");
                            if (confirmed) {
                              handleDeleteMeal(meal.id, day.key);
                            }
                          }}
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "8px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "red",
                            fontSize: "1.6rem",
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <span style={{ color: "#888" }}>Nema obroka</span>
                  )}
                </div>

                <button
                  onClick={() => addMeal(day.key)}
                  className="mt-2 p-2 text-white rounded"
                  style={{
                    backgroundColor: "#66bb6a",
                    border: "none",
                    marginTop: "8%",
                    marginBottom: "8%",
                  }}
                >
                  Dodaj obrok
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
  <button 
    onClick={() => {
      if (!shoppingList) return;

      const confirmed = window.confirm(
        "Da li zelite da preuzmete tekstualni fajl liste za kupovinu za Vase obroke u sledecih 7 dana?"
      );
      if (!confirmed) return;

      const content = shoppingList.split(", ").join("\n");
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "lista_za_kupovinu.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }}
    className="btn btn-success"
    style={{
      padding: "12px 24px",
      backgroundColor: "#66bb6a",
      border: "none",
      borderRadius: "8px",
      }}
    >
    Napravi listu za kupovinu
  </button>
  </div>
    </div>
  );
};

export default ObrociPage;
