import {useState, useEffect} from 'react';

const useCurrentPosition = (options={}) => {

    const[location, setLocation] = useState("");
    const [error, setError] = useState();
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

    useEffect(() => {
        const {geolocation} = navigator;

        if (!geolocation) {
            setError("Geolocation not supported")
            return;
        }
        geolocation.getCurrentPosition(handleSucces, handleError, options)
    },[options])
    
    return {location, error};
};
export default useCurrentPosition;