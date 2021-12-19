import {useState, useEffect} from 'react';
import Api from '../Api';

let initalValue = {
	showLoadCitys: false,
	city: []
}

/* Skapar polygons för städer, tar emot mapRef som är objektet för kartan.
   Samt props för att se om polys för map ska tas bort/läggas till på kartan.
*/
const useDisplayPolyCities = (mapRef, {ifToShowCity}) => {
    const[cityObject, setcityObject] = useState([]); // håller objektet så att man kan ta bort det från kartan
    const[cityContent, setCityContent] = useState(initalValue); // håller content för onClick
    const[cityError, setCityError] = useState(false); 


    // funktion som togglar state, från andra Map komponent
    const showInfoForCity = (trueOrFalse) => {
        setCityContent({showLoadCitys: trueOrFalse });
    }

    
    // Om props ändras samt vid mount.
    // Är props true hämta data. Om false ta bort från karta
    useEffect(() => {

        /* Tar emot res från getData. Loopar igenom. Skapar poly av
       alla koordinater som tillhör städer. Lägger på onclickevent.
       Sparar objekten i state, så de senare kan tas bort.
        */
        const handleSucces = (res) => {
            var cityname;
            const map = mapRef.current.map;
            const maps = mapRef.current.maps;
        
            res.forEach(city => {
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
                
                cityname.addListener('click', () => {
                    setCityContent(prevState => ({
                        showLoadCitys: !prevState.showLoadCitys,
                        city
                    }));
                });
        
                cityname.setMap(map);
                var holdArr = cityObject;
                holdArr.push(cityname);
                setcityObject(holdArr);
            })
        };

        
        // tar bort poly för städer från kartan genom att sätta mapobj för alla stadspoly till null
        function removeCitysFromMap() { 
            cityObject !== null && cityObject.forEach(city => {
                city.setMap(null);
            })
        }
    
        const getData = async () => {
            try {
                setCityError(false)
                let res = await Api.getAllCitys();
                handleSucces(res)
            } catch (error) {
                setCityError(true)
            }
        }
        // Hämta data vid if
        if(ifToShowCity.loadCity) {
            getData()
            const interval=setInterval(()=>{
                getData()
            }, 10000)
            return()=>clearInterval(interval)
        }
        ifToShowCity.loadCity === false && removeCitysFromMap()  
    }, [ifToShowCity.loadCity, cityObject, mapRef])

    return {cityContent, cityError, showInfoForCity};
};
export default useDisplayPolyCities;

