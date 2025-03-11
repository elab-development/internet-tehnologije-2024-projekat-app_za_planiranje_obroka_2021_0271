import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReceptiDetaljnijePage = () => {
    const { id } = useParams();
    const [recept, setRecept] = useState(null);
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
                console.log(namirniceResponse.data)
            } catch (err) {
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecept();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!recept) return <div>No data available.</div>;

    const broj_kalorija = namirnice.reduce((sum, namirnica) => sum + (namirnica.namirnica.broj_kalorija * namirnica.kolicina || 0), 0) / 100;
    const proteini = namirnice.reduce((sum, namirnica) => sum + (namirnica.namirnica.proteini * namirnica.kolicina || 0), 0) / 100;;
    const ugljeni_hidrati = namirnice.reduce((sum, namirnica) => sum + (namirnica.namirnica.ugljeni_hidrati * namirnica.kolicina || 0), 0) / 100;;
    const masti = namirnice.reduce((sum, namirnica) => sum + (namirnica.namirnica.masti * namirnica.kolicina || 0), 0) / 100;;


    return (
        <div
            className="min-h-screen flex justify-center"
            style={{
                backgroundColor: 'rgba(178, 246, 175, 0.8)',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <section style={{ margin: '8% 25%' }}>
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
                            <h2 className="text-xl font-semibold">Namirnice</h2>
                            <br/>
                            
                            <ul>
                                {namirnice.length > 0 ? (
                                    namirnice.map((namirnica) => (
                                        <li key={namirnica.namirnica.id} className="break-words">
                                            <p>{namirnica.namirnica.naziv} - {namirnica.kolicina}g</p>   
                                        </li>
                                    )) ) : ( <li>No ingredients found.</li> )}
                            </ul>
                        </div>
                        <br/>
                        <hr/>
                        <br/>

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Opis</h2>
                            <br/>
                            <p className="break-words">{recept.opis}</p>
                        </div>

                        <br/>
                        <hr/>
                        <br/>

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Nutritivne Vrednosti</h2>
                            <br/>
                            <table
                                className="w-full mt-4 border-separate"
                                style={{ border: "2px solid #225522", borderSpacing: "0" }}
                                >
                                <thead>
                                    <tr className="bg-red-200">
                                    <th className="px-4 py-2"  style={{ border: "2px solid #225522" }} >
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
                                        {broj_kalorija}
                                    </td>
                                    <td className="px-4 py-2" style={{ border: "2px solid #225522" }}>
                                        {proteini}
                                    </td>
                                    <td className="px-4 py-2" style={{ border: "2px solid #225522" }}>
                                        {ugljeni_hidrati}
                                    </td>
                                    <td className="px-4 py-2" style={{ border: "2px solid #225522" }}>
                                        {masti}
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReceptiDetaljnijePage;