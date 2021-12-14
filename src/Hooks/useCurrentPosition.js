import {useState, useEffect} from 'react';

/* useCurrentPosition används av Map komponenten. Hämtar användarens position 
   Options är hur länge location ska sparas, tas alltså mot av Map.
   Retunerar position och error.
*/
const useCurrentPosition = (options={}) => {

    const [location, setLocation] = useState("");
    const [error, setError] = useState();
    
    // Om det går att hämta position
    const handleSucces = (pos) => {
        const {latitude, longitude } = pos.coords;
        setLocation({
            latitude,
            longitude
        });
    };

    const handleError = (error) => {
        setError(error.message);
    };

    // Vid mount eller om options ändras.
    // skickar till handelSuccess & error 
    useEffect(() => {
        const {geolocation} = navigator;
        if (!geolocation) {
            setError("Geolocation not supported");
            return;
        }
        geolocation.getCurrentPosition(handleSucces, handleError, options);
    },[options])

    return {location, error};
};
export default useCurrentPosition;