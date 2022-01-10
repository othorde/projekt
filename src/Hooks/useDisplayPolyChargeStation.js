import {useState, useEffect} from 'react';
import {getAllCitys} from '../Api';

let initalValue = {
	showLoadStations: false,
	loadStations: []
}

/* useDisplayPolyChargeStation sätter polygons(laddstationer) på kartan
   genom att hämta från db och sen skriva ut. mapRef är kartan. Tar mot props om 
   den ska tas bort från kartan/läggas till.
*/
const useDisplayPolyChargeStation = (mapRef, {ifToShowLoadStations}) => {
    const[loadStationObject, setLoadStationObject] = useState([]); // sparar objektet i state så att man kan ta bort det från kartan
    const[loadStationContent, setLoadStationContent] = useState(initalValue); // håller content för onClick
    const[loadStationError, setLoadStationError] = useState(false); // håller content för onClick

    
    // funktion som kan toggla state, används från map
    const showInfoForLoadStation = (trueOrFalse) => {
        setLoadStationContent({ showLoadStations: trueOrFalse});
	}
    // Om props ändras samt vid mount.
    // Är props true hämta data. Om false ta bort från karta
    useEffect(()=>{
            
        // Hämta data
        const getData = async () => {
            try {
                setLoadStationError(false)
                let res = await getAllCitys();
                handleSucces(res)
            } catch (error) {
                setLoadStationError(true)
            }
        }

        // tar bort loadinstations från kartan genom att sätta mapobj som är sparat i state till null.
        const removeLoadingStationsFromMap = () => {
            loadStationContent !== null && loadStationObject.forEach(loadStation => {
                loadStation.setMap(null);
            })
        }

        /* 
        loopar igenom res från db, tar ut alla koordinatera som
        är laddstationer, skapar sedan ny polygon med dessa
        och lägger på ett klickevent. Sparar obj i state
        så att det senare kan tas bort
        */
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
                
                loadStationName.addListener('click', () => {
                    setLoadStationContent(prevState => ({
                        showLoadStations: !prevState.showLoadStations,
                        loadStations
                    }));
                });
                loadStationName.setMap(map);
                // Kopierar tidigare state + lägger in nytt element sedan sätter state
                var holdArr = loadStationObject;
                holdArr.push(loadStationName);
                setLoadStationObject(holdArr);
                })

            })
        };

        if(ifToShowLoadStations.loadStation) {
            getData()
            const interval=setInterval(()=>{
                getData()
            }, 10000)
            return()=>clearInterval(interval)
        }
        ifToShowLoadStations.loadStation === false && removeLoadingStationsFromMap()  
    },[ifToShowLoadStations.loadStation, loadStationContent, loadStationObject, mapRef])

    return {loadStationObject, loadStationContent, loadStationError, showInfoForLoadStation};
}
export default useDisplayPolyChargeStation;

