import {useState, useEffect} from 'react';
import Api from '../api';

const useLoadCitysToMap = (mapRef, props, changePopUpInfo) => {
    const[cityObject, setcityObject] = useState([]); // håller objektet så att man kan ta bort det från kartan
    const[cityContent, setCityContent] = useState([]); // håller content för onClick
    // sparar res i state, så slipper hämta från servern hela tiden. Kanske ändra om vi ska köra nån realtime
    const[resFromApi, setResFromApi] = useState(null); 
    const [errorForCity, setErrorForCity] = useState();
    console.log(props)
    
    const handleSucces = (res) => {
    var cityname;
    const map = mapRef.current.map;
    const maps = mapRef.current.maps;

    res.map(city => {

        cityname = city.city
        let polyGon = 
            ([city.position.polygonePart1,
                city.position.polygonePart2,
                city.position.polygonePart3,
                city.position.polygonePart4
            ]);
        cityname = new maps.Polygon({
            paths: polyGon,
            strokeColor: "#FF0000",
            strokeOpacity: 0.9,
            strokeWeight: 2,
            fillColor: "transparent",
            fillOpacity: 0.35,
            });
        
        cityname.addListener('click', (event) => {
            setCityContent({ city, showCity: true })
        });
        cityname.setMap(map);
        setcityObject(oldArray => [...oldArray, cityname]);

        })
    };
    const handleError = (error) => {
        setErrorForCity(error.message);
    };

    // tar bort loadinstations från kartan, Ska man rensa i states? Isf kommer backend att kallas.
    // Kommer behövas om man ska få realtiduppdateringar, typ timer
	function removeCitysFromMap() { 
		if (cityObject !== null) {
			cityObject.map(city => {
				city.setMap(null);
			})
		}
        return
	}

    useEffect(async () => {
        // Om loadStations ska tas bort från kartan
        if (props.ifToShowCity.loadCity === false ) {
            removeCitysFromMap(mapRef)
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
    },[mapRef, props.ifToShowCity.loadCity])
    
    return {cityContent, errorForCity};
};
export default useLoadCitysToMap;

