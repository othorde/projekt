import {useState, useEffect} from 'react';
import {getAllCitys} from '../Api';

let initalValue = {
	showParkingZone: false,
	loadParkingZone: []
}

/* Skapar polygons för städer, tar emot mapRef som är objektet för kartan.
   Samt props för att se om polys för map ska tas bort/läggas till på kartan.
*/
const useDisplayPolyParkZone = (mapRef, {ifToShowParkingZone}) => {
    const[parkingZoneObject, setParkingZoneObject] = useState([]); // håller objektet så att man kan ta bort det från kartan
    const[parkingZoneContent, setParkingZoneContent] = useState(initalValue); // håller content för onClick
    const[parkingZoneError, setParkingZoneError] = useState(false); // håller content för onClick
    
    // funktion som togglar state, från andra komponenter
    const showInfoForParkingZone = (trueOrFalse) => {
        setParkingZoneContent({ showParkingZone: trueOrFalse});
    }

    //körs vid mount och förändring av prop om poly för städer ska visas = hämtar,
    // annars tar bort med removeCitysFromMap
    useEffect(() => {
        /* 
        Tar emot res från getData. Loopar igenom. Skapar poly av
        alla koordinater som tillhör städer. Lägger på onclickevent.
        Sparar objekten i state, så de senare kan tas bort.
        */
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
                    
                    parkingZoneName.addListener('click', () => {
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

        // tar bort poly för parkeringszoner från kartan genom att sätta mapobj för alla polys till null
        function removeParkingZonesFromMap() { 
            parkingZoneObject !== null && parkingZoneObject.forEach(parkingZone => {
                parkingZone.setMap(null);
            })
        }

        const getData = async () => {
            try {
                setParkingZoneError(false)
                let res = await getAllCitys();
                handleSucces(res);
            } catch (error) {
                setParkingZoneError(true)
            }
        }

        if(ifToShowParkingZone.loadParkingZone) {
            getData()
            const interval=setInterval(()=>{
                getData()
            }, 10000)
            return()=>clearInterval(interval)
        }
        ifToShowParkingZone.loadParkingZone === false && removeParkingZonesFromMap();
    }, [ifToShowParkingZone.loadParkingZone, parkingZoneObject, mapRef])
    
    return {parkingZoneObject, parkingZoneContent, parkingZoneError, showInfoForParkingZone};
};
export default useDisplayPolyParkZone;

