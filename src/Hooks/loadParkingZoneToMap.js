import {useState, useEffect} from 'react';
import Api from '../api';

let initalValue = {
	showParkingZone: false,
	loadParkingZone: []
}

const useLoadParkingZones = (mapRef, props) => {
    const[parkingZoneObject, setParkingZoneObject] = useState([]); // håller objektet så att man kan ta bort det från kartan
    const[parkingZoneContent, setParkingZoneContent] = useState(initalValue); // håller content för onClick
    // sparar res i state, så slipper hämta från servern hela tiden. Kanske ändra om vi ska köra nån realtime
    const[resFromApi, setResFromApi] = useState(null); 

    const handleSucces = (res) => {
    var parkingZoneName;
    const map = mapRef.current.map;
    const maps = mapRef.current.maps;

    res.forEach(cityCoords => {
        cityCoords.parking_zones.forEach(parking_zone => {         
            let polyGon = 
                ([
                    parking_zone.position.polygonePart1,
                    parking_zone.position.polygonePart2,
                    parking_zone.position.polygonePart3,
                    parking_zone.position.polygonePart4,
                ]);
            parkingZoneName = new maps.Polygon({
                paths: polyGon,
                strokeColor: parking_zone.color,
                strokeOpacity: 0.9,
                strokeWeight: 2,
                fillColor: "transparent",
                fillOpacity: 0.35,
                });
            
            parkingZoneName.addListener('click', (event) => {
                setParkingZoneContent(prevState => ({
                    showParkingZone: !prevState.showParkingZone,
                    loadParkingZone: parking_zone
                }));
            });
        parkingZoneName.setMap(map);
        var holdArr = parkingZoneObject;
        holdArr.push(parkingZoneName);
        setParkingZoneObject(holdArr);

        })

    })
};

    // funktion som kan toggla state, från andra komponenter
    const showInfoForParkingZone = (trueOrFalse) => {
        setParkingZoneContent({ showParkingZone: trueOrFalse});
	}

    // tar bort loadinstations från kartan, Ska man rensa i states? Isf kommer backend att kallas.
    // Kommer behövas om man ska få realtiduppdateringar, typ timer
	function removeParkingZonesFromMap() { 
		
			parkingZoneObject.forEach(parkingZone => {
				parkingZone.setMap(null);
			})
		
        return
	}

    useEffect(async () => {
        // Om loadParkingZone ska tas bort från kartan
        if (props.ifToShowParkingZone.loadParkingZone === false ) {
            removeParkingZonesFromMap()
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
            console.log("Error")
            return;
        }
    },[mapRef, props.ifToShowParkingZone.loadParkingZone])
    
    return {parkingZoneObject, parkingZoneContent, showInfoForParkingZone};
};
export default useLoadParkingZones;

