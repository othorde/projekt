import {useState, useEffect} from 'react';
import Api from '../api';

const useLoadStationToMap = (mapRef, props) => {
    const[loadStationObject, setLoadStationObject] = useState([]); // håller objektet så att man kan ta bort det från kartan
    const[loadStationContent, setLoadStationContent] = useState([]); // håller content för onClick
    // sparar res i state, så slipper hämta från servern hela tiden. Kanske ändra om vi ska köra nån realtime
    const[resFromApi, setResFromApi] = useState(null); 
    const [error1, setError1] = useState();
    console.log(props)
    const handleSucces = (res) => {
    var loadStationName;
    const map = mapRef.current.map;
    const maps = mapRef.current.maps;

    res.map(cityCoords => {
        cityCoords.charging_posts.map(loadStations => {         
            let polyGon = 
                ([cityCoords.position.polygonePart1,
                    cityCoords.position.polygonePart2,
                    cityCoords.position.polygonePart3,
                    cityCoords.position.polygonePart4
                ]);
            loadStationName = new maps.Polygon({
                paths: polyGon,
                strokeColor: "yellow",
                strokeOpacity: 0.9,
                strokeWeight: 2,
                fillColor: "transparent",
                fillOpacity: 0.35,
                });
            
            loadStationName.addListener('click', (event) => {
                setLoadStationContent({loadStations}); //klickevent, fungerade inte med onClick
            });
        loadStationName.setMap(map);
        setLoadStationObject(oldArray => [...oldArray, loadStationName]);
        })
    })
};
    const handleError = (error) => {
        setError1(error.message);
    };

    // tar bort loadinstations från kartan, Ska man rensa i states? Isf kommer backend att kallas.
    // Kommer behövas om man ska få realtiduppdateringar, typ timer
	function removeLoadingStationsFromMap() { 
		if (loadStationObject !== null) {
            console.log("HÅR")
			loadStationObject.map(loadStation => {
                console.log(loadStation)
				loadStation.setMap(null);
			})
		}
        return
	}

    useEffect(async () => {
        // Om loadStations ska tas bort från kartan
        if (props.ifToShowLoadStations.loadStation === false ) {
            removeLoadingStationsFromMap(mapRef)
            return
        }
        // Om state är null == ej hämtat från backend ännu
        if (resFromApi === null) {
            let res = await Api.getAllCitys();
            setResFromApi(res);
            handleSucces(res)
        // Annars använd det som är sparat i state
        } else if (resFromApi != null) {
            handleSucces(resFromApi);
        } else {
            handleError("Error")
            return;
        }
        // geolocation.getCurrentPosition(handleSucces, handleError, options)
    },[mapRef, props.ifToShowLoadStations.loadStation])
    
    return {loadStationObject, loadStationContent, error1};
};
export default useLoadStationToMap;

