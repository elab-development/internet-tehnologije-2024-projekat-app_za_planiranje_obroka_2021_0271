import axios from "axios";
import Recept from "./Recept";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const ReceptiPage = () => {
    const [recepti, setRecepti] = useState([]); // Store all recipes fetched
    const [limit, setLimit] = useState(5); // Limit the number of recipes shown at once
    const [totalRecipes, setTotalRecipes] = useState(0); // Store total number of recipes
    const [loading, setLoading] = useState(true); // To track loading state

    useEffect(() => {
        setLoading(true); // Set loading to true when fetching data
        axios.get("api/recepti")
            .then((response) => {
                setRecepti(response.data.data); // Store fetched recipes
                setTotalRecipes(response.data.meta.total); // Set total number of recipes
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
                setLoading(false); // Set loading to false in case of error
            });
    }, []); // Fetch recipes when the component mounts

    const handleLoadMore = () => {
        setLimit((prevLimit) => prevLimit + 5); // Increase limit by 5 when clicking "Load More"
    };

    // Show toast notification when all recipes are loaded
    const showAllLoadedToast = () => {
        toast.info("Učitani su svi recepti", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
        });
    };

    return (
        <section>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    backgroundColor: "rgba(178, 246, 175, 0.8)",
                    minHeight: "105vh",  // Ensures the div takes up the full height of the viewport
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <br />

                <br /><br /><br /><br />
                {/* Here you can add a search bar if needed */}

                <br />

                <div className="flex-column" style={{ borderRadius: "0rem", width: "50%" }}>
                    {/* Display recipes based on the limit */}
                    {loading ? (
                        <p>Učitavanje</p>
                    ) : (
                        <>
                            {recepti.slice(0, limit).map((recept) => (
                                <Recept key={recept.id} recept={recept} />
                            ))}
                            {/* If no more recipes to load, show toast */}
                            {limit >= totalRecipes && showAllLoadedToast()}
                        </>
                    )}
                </div>

                <br /><br /><br /><br />

                {/* Button to load more recipes */}
                {limit < totalRecipes && (
                    <button
                        onClick={handleLoadMore} // Increase the limit by 5 when clicked
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "#66bb6a",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Prikaži više
                    </button>
                )}
            </div>
            <ToastContainer />
        </section>
    );
};

export default ReceptiPage;
