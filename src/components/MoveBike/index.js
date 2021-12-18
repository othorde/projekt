import {React, useState, useContext, useEffect} from "react";
import Api from "../../Api";
import AppContext from "../../AppContext";
import {StyleMoveBike} from './Form.styles.js'
import {checkIfCoordInChargingPost, checkIfCoordInParkingZone} from '../../helperfunction/helpers'

/* Förflyttar en cykel från en position till en annan.
    Uppdaterar därför flera värden i db
    Skapar/uppdaterar även en logg för händelsen
*/
export default function MoveBike({city, position, id, battery}) {
    const myContext = useContext(AppContext);
    const [charging_posts, setCharging_posts] = useState([])
    const [allParkingZones, setAllParkingZones] = useState([])
    const [moveBikeToColor, setMoveBikeToColor] = useState("")
    const [message, setMessage] = useState("")
    const [cityState, setCityState] = useState([]) //parkering och laddstationer
    
    /* hämtar alla ladd/parkeringszoner sparar i state 
        KONTROLLERA SÅ att denna fungerar med flera städer
    */
    async function getLoadStationsForMovingBike() {
        try {
            let cityApi = await Api.getACity(city);
            setCityState(cityApi[0].city);
            setCharging_posts(cityApi[0].charging_posts);
            setAllParkingZones(cityApi[0].parking_zones);
        } catch (error) {
            setMessage("Något gick fel vid hämtningen från servern")
        }
    }
    /* När admin förflyttar cykel 
        Behöver uppdatera en del, alla är beroende av varandra
        så måste kolla först att det går igenom innan nästa
    */
    const handleSubmit = async () => {
        if (moveBikeToColor === '' || moveBikeToColor === null) { // Om inget val görs
            setMessage("Välj först vart du vill förflytta cykeln")
        } else {
            let newPosition = calculateScooterNewPosition();
            if (newPosition) {
                updateScooter(newPosition);
                updateScootersUser();
                updateScooterLogg(newPosition);
                updateZones();
            }
        }
    }

    /* Uppdaterar själva scootern */
    async function updateScooter(newPosition) {
        var speed = "0";
        var battery = "100";

        if (position !== null) {
            var response = await Api.updateAScooter(id, speed, battery, newPosition); //uppdaterar scootern
            response === false && setMessage("Kunde ej uppdatera användaren");
        }
    }
    /* uppdaterar scooterns användare */
    async function updateScootersUser() {
        var response = await Api.updateAScootersUser(id);
        response === false && setMessage("Kunde ej uppdatera användaren");
    }

    async function updateScooterLogg(newPosition) {

        var active_user = "null";
        var event = getEventString(newPosition);
        var {time} = getTime();

        const varForUpdate = {
            id: id,
            active_user: active_user,
            event: event,
            start_lat: position.lat,
            start_lng: position.lng,
            time: time,
            end_lat: newPosition.lat,
            end_lng: newPosition.lng,
        }
        var response = await Api.updateAScootersLogg(varForUpdate);
        response ? setMessage("Cykel förflyttad, logg uppdaterad") : setMessage("Något gick fel, kunde ej uppdatera logg");
    }

    /* UPPDATERA ZONER */

    /* Tid för eventet (loggen) +1 i månad, så blir det rätt
        Lägger även till en nolla om minuter är under 10. 
        annars blir det 18.5 istför 18.05
    */
    function getTime() {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var min = today.getMinutes();
        var hours = today.getHours();
        min = min < 10 ? `0${min}` : min;
        var time = hours + ":" + min;
        var dateTime = date+' '+time;

        return {time, dateTime}
    }

    /* Skapar string för event (loggen) */
    function getEventString(newPosition) {
        var {dateTime} = getTime();
        var movedBy = myContext.userHook.value.user;
        var event = `${dateTime} \n 
        Moved(update)(bikeId:${id})\n
        from position: lat: ${position.lat} lng: ${position.lng} to the ${moveBikeToColor} zon.\n
        New exact position in zon: lat: ${newPosition.lat}, lng: ${newPosition.lng}.\n
        Speed is now 0 and battery is charged from ${battery} to 100%. Carried out by ${movedBy}.
    `;
        return event
    }

    /* Räknar ut ny position inom den zon som scootern ska flyttas till
        Om den nya zonen ej är inom området så anropas denna funktionen igen
        för att hitta en ny position som stämmer. Matten är inte exakt.
    */
    function calculateScooterNewPosition() {
        let newPosition;
        var insidePoly = false;
        charging_posts.filter(elem=> elem.color.includes(moveBikeToColor) ? newPosition = elem.position : null)
        let lat = newPosition.polygonePart1.lat + (Math.random() * (newPosition.polygonePart4.lat - newPosition.polygonePart1.lat)); 
        let lng = newPosition.polygonePart1.lng + (Math.random() * (newPosition.polygonePart4.lng - newPosition.polygonePart1.lng)); 
        var polygone= [
            [newPosition.polygonePart1.lat, newPosition.polygonePart1.lng],
            [newPosition.polygonePart2.lat, newPosition.polygonePart2.lng],
            [newPosition.polygonePart3.lat, newPosition.polygonePart3.lng],
            [newPosition.polygonePart4.lat, newPosition.polygonePart4.lng]
        ]
        newPosition = {lat: lat, lng: lng}

        var newPositionArr = [newPosition.lat, newPosition.lng]
        var pointInPolygon = require('point-in-polygon');
        insidePoly = pointInPolygon(newPositionArr, polygone);

        if(!insidePoly) {
            return calculateScooterNewPosition()
        } 
        if(insidePoly) {
            return newPosition
        }
    }

    /* Kontrollerar om start pos för cykel finns i en zon mha helper function
       OM, uppdatera den zonen med minus 1. uppdaterar alltid zonen för slutposition med +1
    */
    async function updateZones() {
        let res;
        let startCoords = position;
        let amount_of_bikes;
        let color;
        startCoords = [startCoords.lat, startCoords.lng];
        let coordInParkingZone = checkIfCoordInParkingZone(startCoords, allParkingZones);
        let coordInChargingPost = checkIfCoordInChargingPost(startCoords, charging_posts);
        
        //Kollar alltid hur många cyklar som finns i station
        res = await Api.getAllChargePost(cityState, moveBikeToColor);
        // Uppdaterar alltid laddstationen med +1
        console.log(res)
        if(!res === false) {
            console.log(res, "HÄÄÄR")
            let amount_of_bikes_in_new_zone = res + 1;
            res = await Api.updateNrBikesChargePost(cityState, amount_of_bikes_in_new_zone, moveBikeToColor);
            console.log(res)

            res === false && setMessage("Kund ej uppdatera laddstationen");
        }
        //Uppdaterar zon med -1 OM cykel tidigare fanns i en parkeringszon
        if(coordInParkingZone && coordInParkingZone.returned === true) {
            amount_of_bikes = coordInParkingZone.amount_of_bikes_zone - 1;
            color = coordInParkingZone.color
            updateParkZone(amount_of_bikes, color);
        }
        //Uppdaterar zon med -1 OM cykel tidigare fanns i en laddstation
        if (coordInChargingPost && coordInChargingPost.returned === true) {
            amount_of_bikes = coordInChargingPost.amount_of_bikes_post - 1;
            color = coordInChargingPost.color;
            updateChargePost(amount_of_bikes, color)
        }
    }

    async function updateParkZone(amount_of_bikes, color) {
        let res;
        res = await Api.updateNrBikesParkZone(cityState, amount_of_bikes, color);
        res === false && setMessage("Kund ej uppdatera parkeringszonen");
    }

    async function updateChargePost(amount_of_bikes, color) {
        let res;
        res = await Api.updateNrBikesChargePost(cityState, amount_of_bikes, color);
        res === false && setMessage("Kund ej uppdatera laddstationen");
    }

    /* timer för meddelande */
    useEffect(() => {
        setTimeout(() => setMessage(""), 8000);
        setMoveBikeToColor("")
    }, [message])

	return (
        <StyleMoveBike onClick = {getLoadStationsForMovingBike}> {/* laddar in ny info med onClick */}
            {/* meddelande om det går bra/dåligt med uppdatering */}
            {message && <p style={{color:"red", "paddingLeft": "1em"}}> {message} </p>} 
            <select 
                data-testid="dropdown" onChange={(e) => {
                    setMoveBikeToColor(e.target.value)
                }}
                value={moveBikeToColor}
            >
            {/* Options för vart cyklen ska flyttas */}
                <option value={''}>-- Välj vart cykeln ska förflyttas --</option>
                {charging_posts.map(elem => elem !== null  &&
                    <option key={elem.color}value={elem.color}>
                    {elem.color + " zon"}
                </option> )}
            </select>
            <button onClick={handleSubmit}> Förflytta cykel </button>
        </StyleMoveBike>
	);
}


