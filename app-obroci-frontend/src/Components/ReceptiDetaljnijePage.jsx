import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const ReceptiDetaljnijePage = () => {
    const { id } = useParams();
    const [recept, setRecept] = useState(null);
    const location = useLocation();
    const fromObroci = location.state?.fromObroci || false;
    const [namirnice, setNamirnice] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecept = async () => {
            try {
                const response = await axios.get(`/api/recepti/${id}`);
                setRecept(response.data.recept);
                const namirniceResponse = await axios.get(`/api/recepti/${id}/namirnice`);
                setNamirnice(namirniceResponse.data.data);
            } catch (err) {
                setError('Došlo je do greške prilikom preuzimanja podataka.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecept();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!recept) return <div>Nema dostupnih podataka.</div>;

    const broj_kalorija = namirnice.reduce((sum, n) => sum + (n.namirnica.broj_kalorija * n.kolicina || 0), 0) / 100;
    const proteini = namirnice.reduce((sum, n) => sum + (n.namirnica.proteini * n.kolicina || 0), 0) / 100;
    const ugljeni_hidrati = namirnice.reduce((sum, n) => sum + (n.namirnica.ugljeni_hidrati * n.kolicina || 0), 0) / 100;
    const masti = namirnice.reduce((sum, n) => sum + (n.namirnica.masti * n.kolicina || 0), 0) / 100;

    return (
        <div
            style={{
                backgroundColor: 'rgba(178, 246, 175, 0.8)',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 10px',
                boxSizing: 'border-box'
            }}
        >
            <section style={{ width: '100%', maxWidth: '700px' }}>
                <div style={{ marginBottom: "20px", fontSize: "0.9rem" }}>
                    <p style={{ color: "#555" }}>
                        <Link to="/" style={{ color: "#2e7d32", textDecoration: "underline" }}>Početna</Link>
                        {" > "}
                        <Link
                            to={fromObroci ? "/obroci" : "/recepti"}
                            style={{ color: "#2e7d32", textDecoration: "underline" }}
                        >
                            {fromObroci ? "Obroci" : "Recepti"}
                        </Link>
                        {" > "}
                        <span>{recept?.naziv || "Recept"}</span>
                    </p>
                </div>

                <div
                    style={{
                        overflow: 'auto',
                        maxHeight: '80vh',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    <div
                        className="px-3 py-2 font-semibold text-3xl"
                        style={{
                            background: 'linear-gradient(to right,#5ab869,#66bb6a)',
                            textAlign: 'center'
                        }}
                    >
                        <h1>{recept.naziv}</h1>
                    </div>

                    <div
                        className="p-4"
                        style={{
                            background: 'linear-gradient(to right, rgb(238, 222, 168), rgb(248, 231, 175))',
                            minWidth: '350px'
                        }}
                    >
                        <div className="pt-4 border-t border-gray-400">
                            <h2 className="text-xl font-semibold">Namirnice</h2>
                            <br />
                            <ul>
                                {namirnice.length > 0 ? (
                                    namirnice.map((n) => (
                                        <li key={n.namirnica.id} className="break-words">
                                            <p>{n.namirnica.naziv} - {n.kolicina}g</p>
                                        </li>
                                    ))
                                ) : (
                                    <li>No ingredients found.</li>
                                )}
                            </ul>
                        </div>

                        <br /><hr /><br />

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Opis</h2>
                            <br />
                            <p className="break-words">{recept.opis}</p>
                        </div>

                        <br /><hr /><br />

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Nutritivne Vrednosti</h2>
                            <br />
                            <div style={{ overflowX: "auto" }}>
                                <table
                                    className="w-full mt-4 border-separate"
                                    style={{ border: "2px solid #225522", borderSpacing: "0", minWidth: "400px" }}
                                >
                                    <thead>
                                        <tr className="bg-red-200">
                                            <th className="px-4 py-2" style={{ border: "2px solid #225522" }}>
                                                Kalorije (kcal)
                                            </th>
                                            <th className="px-4 py-2" style={{ border: "2px solid #225522" }}>
                                                Proteini (g)
                                            </th>
                                            <th className="px-4 py-2" style={{ border: "2px solid #225522" }}>
                                                Ugljeni hidrati (g)
                                            </th>
                                            <th className="px-4 py-2" style={{ border: "2px solid #225522" }}>
                                                Masti (g)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-4 py-2" style={{ border: "2px solid #225522" }}>
                                                {broj_kalorija.toFixed(1)}
                                            </td>
                                            <td className="px-4 py-2" style={{ border: "2px solid #225522" }}>
                                                {proteini.toFixed(1)}
                                            </td>
                                            <td className="px-4 py-2" style={{ border: "2px solid #225522" }}>
                                                {ugljeni_hidrati.toFixed(1)}
                                            </td>
                                            <td className="px-4 py-2" style={{ border: "2px solid #225522" }}>
                                                {masti.toFixed(1)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReceptiDetaljnijePage;
