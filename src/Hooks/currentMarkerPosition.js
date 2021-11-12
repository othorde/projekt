import {useState, useEffect} from 'react';

const useCurrentPosition = (options={}) => {

    const[Marker, setMarker] = useState("");

    

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