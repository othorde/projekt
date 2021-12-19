import {useState, useEffect} from "react";
import Api from "../Api";

/* Hämtar en användare, tar mot ett id. Retunerar användaren, meddelande, om den laddar. */
export const useFetchAUser = (id) => {
    const [aUser, setAUser] = useState([]);
    const [aUserLoading, setUserLoading] = useState(false);
    const [aUserMessage, setUserMessage] = useState("Loading...");

    // hämt funktion. Sätter states
    const fetchData = async (id) => {
        let data;
        try {
            setUserLoading(true)
            const res = await Api.getAUser(id)
            data = res.data;
            data.trips.length > 0 ? setAUser(data.trips) : setUserMessage("Ingen resa gjord");
            
        } catch (error) {
            setUserMessage("Något gick fel vid hämtningen från servern")
        }
        setUserLoading(false)
    }

    // hämta endast vid mount
    useEffect(() => {
        fetchData(id);
    },[id]);

    return {aUser, aUserLoading, aUserMessage}
}

