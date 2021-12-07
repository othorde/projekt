import {useState, useEffect} from 'react';
import Api from '../api';

let initalValue = {
	showLoadStations: false,
	loadStations: []
}

const useLoadStationToMap = (mapRef, props) => {
    const[loadStationObject, setLoadStationObject] = useState([]); // håller objektet så att man kan ta bort det från kartan
    const[loadStationContent, setLoadStationContent] = useState(initalValue); // håller content för onClick
    const[resFromApi, setResFromApi] = useState(null); 
    const [error1, setError1] = useState();
    const handleSucces = (res) => {
    var loadStationName;
    const map = mapRef.current.map;
    const maps = mapRef.current.maps;

    res.forEach(cityCoords => {
        cityCoords.charging_posts.forEach(loadStations => {         
            let polyGon = 
                ([
                    loadStations.position.polygonePart1,
                    loadStations.position.polygonePart2,
                    loadStations.position.polygonePart3,
                    loadStations.position.polygonePart4,
                ]);
            loadStationName = new maps.Polygon({
                paths: polyGon,
                strokeColor: loadStations.color,
                strokeOpacity: 0.9,
                strokeWeight: 2,
                fillColor: "transparent",
                fillOpacity: 0.35,
                });
            
            loadStationName.addListener('click', (event) => {
                setLoadStationContent(prevState => ({
                    showLoadStations: !prevState.showLoadStations,
                    loadStations
                }));
            });
        /* Kopierar tidigare state + lägger in nytt element
        sedan sätter state = holdArr => arbetar ej direkt mot state */
        loadStationName.setMap(map);
        var holdArr = loadStationObject;
        holdArr.push(loadStationName);
        setLoadStationObject(holdArr);
        })

    })
};

    // funktion som kan toggla state, från andra komponenter
    const showInfoForLoadStation = (trueOrFalse) => {
        setLoadStationContent({ showLoadStations: trueOrFalse});
	}

    const handleError = (error) => {
        setError1(error.message);
    };

    // tar bort loadinstations från kartan, Ska man rensa i states? Isf kommer backend att kallas.
    // Kommer behövas om man ska få realtiduppdateringar, typ timer
	function removeLoadingStationsFromMap() { 
		if (loadStationObject !== null) {
			loadStationObject.forEach(loadStation => {
                console.log(loadStationObject)
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
    },[mapRef, props.ifToShowLoadStations.loadStation])
    
    return {loadStationObject, loadStationContent, error1, showInfoForLoadStation};
};
export default useLoadStationToMap;

