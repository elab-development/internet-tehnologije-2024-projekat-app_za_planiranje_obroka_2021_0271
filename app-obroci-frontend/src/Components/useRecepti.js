import { useState, useEffect } from 'react';
import axios from 'axios';

const usePreferencije = () => {
   
    const [recepti, setRecepti] = useState([]);
    
    useEffect(() => {
        const authToken = window.sessionStorage.getItem("auth_token");

        axios.get("api/recepti")
        .then((response) => {
            setRecepti(response.data.data);
        })
        .catch((error) => {
            console.error("Error fetching recipes:", error);
        });
    }, []);

    return {
     recepti
    };
};

export default usePreferencije;
