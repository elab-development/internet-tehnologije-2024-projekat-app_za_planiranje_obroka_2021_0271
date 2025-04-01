import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Recept from "./Recept";

function ObrociDetaljnijePage() {
    const { id } = useParams();
    const [recept, setRecept] = useState(null);
    const [obrok, setObrok] = useState(null);
    const [namirnice, setNamirnice] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const authToken = window.sessionStorage.getItem("auth_token");

        axios
            .get(`/api/obroci/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                setObrok(response.data.obrok);
                if (response.data.obrok && response.data.obrok.recept) {
                    setRecept(response.data.obrok.recept);
                } else {
                    throw new Error("Odabrani obrok nema recept");
                }
            })
            .catch((error) => {
                console.error("Error fetching meal details:", error);
                setError("Došlo je do greške prilikom učitavanja podataka.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!obrok || !recept) return <div>Nema dostupnih podataka.</div>;

    return (
        <div
            className="min-h-screen flex justify-center"
            style={{
                backgroundColor: 'rgba(178, 246, 175, 0.8)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <section style={{ margin: '4% 25%' }}>
                <nav style={{ fontSize: "0.9rem", marginBottom: "20px" }}>
                    <Link to="/">Početna</Link> &gt; <Link to="/obroci">Obroci</Link> &gt; <span>{recept.naziv}</span>
                </nav>

                <div className="overflow-hidden w-full max-w-md shadow-lg">
                    <div className="px-3 py-2 font-semibold text-3xl" style={{ background: 'linear-gradient(to right,#5ab869,#66bb6a)' }} >
                        <h1 className="text-center">{recept.naziv}</h1>
                    </div>

                    <div
                        className="p-4"
                        style={{
                            background: 'linear-gradient(to right, rgb(238, 222, 168), rgb(248, 231, 175))',
                            position: 'relative',
                        }}
                    >
                        <div className="pt-4 border-t border-gray-400">
                            <h2 className="text-xl font-semibold">Tip obroka:</h2>
                            <br/>
                            <ul><h5>{obrok.tip}</h5></ul>
                            <br/>
                            <hr/>
                            <h2 className="text-xl font-semibold" style={{marginTop:"5%"}}>Datum obroka:</h2>
                            <br/>
                            <ul><h5>{obrok.datum}</h5></ul>
                        </div>
                        <br/>
                        <hr/>
                        <br/>

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Recept obroka:</h2>
                            <br/>
                            <div className="flex-column" style={{ borderRadius: "0rem", width: "95%", marginTop:"3%" }}>
                                {loading ? (
                                    <div className="loading-container">
                                        <p>Učitavanje...</p> 
                                    </div>
                                ) : (
                                    recept ? (
                                        <Recept key={recept.id} recept={recept} />
                                    ) : (
                                        <p>Nema dostupnog recepta.</p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ObrociDetaljnijePage;