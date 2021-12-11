import {React, useState, useContext, useEffect} from "react";
import Api from "../../api";
import AppContext from "../../AppContext";
import {StyleMoveBike} from './Form.styles.js'
import {checkIfCoordInChargingPost, checkIfCoordInParkingZone} from '../../helperfunction/helpers'


export default function MoveBike(props) {
    const myContext = useContext(AppContext);
    const [charging_posts, setCharging_posts] = useState([])
    const [allParkingZones, setAllParkingZones] = useState([])
    const [moveBikeToColor, setMoveBikeToColor] = useState(null)
    const [message, setMessage] = useState("")
    const [city, setCity] = useState([]) //parkering och laddstationer

    /* hämtar alla laddstationer sparar i state */
    /* måste lägga till fler städer ??????????????????????????? */
    async function getLoadStationsForMovingBike() {
        let city = await Api.getACity(props.city);
        setCity(city[0].city);
        setCharging_posts(city[0].charging_posts);
        setAllParkingZones(city[0].parking_zones);
    }
    /* När admin förflyttar cykel */
    const handleSubmit = async () => {
        if (moveBikeToColor === '' || moveBikeToColor===null) {
            setMessage("Välj först vart du vill förflytta cykeln")
        } else {
            let newPosition = calculateScooterNewPosition()

            if (newPosition) {
                updateScooter(newPosition);
                updateScootersUser();
                updateScooterLogg(newPosition);
                updateZon();
            }
          
        }
    }

    async function updateScooter(newPosition) {

        var position = props.position;
        var speed = "0";
        var battery = "100";
        var response;
        if (position !== null) {
            response = await Api.updateAScooter(props.id, speed, battery, newPosition); //uppdaterar scootern
            if(response === `Object: ${props.id} updated`) {
                return true;
            }
       }
    }

    async function updateScootersUser() {

        var response = await Api.updateAScootersUser(props.id);  //uppdaterar scooterns användare
        if(response === `Object: ${props.id} updated`) {
            return true;
        }
    }

    async function updateScooterLogg(newPosition) {

        var active_user = "null";
        var event = getEventString(newPosition);
        var {time} = getTime();

        const varForUpdate = {
            id: props.id,
            active_user: active_user,
            event: event,
            start_lat: props.position.lat,
            start_lng: props.position.lng,
            time: time,
            end_lat: newPosition.lat,
            end_lng: newPosition.lng,
        }
        var response = await Api.updateAScootersLogg(varForUpdate);
        if(response && response.data.result === `Object: ${props.id} updated`) {
            setMessage("Cykel förflyttad, logg uppdaterad")
        } else {
            setMessage("Något gick fel")
        }  
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
        if(min < 10) {
            min = `0${min}`
        }
        var time = today.getHours() + ":" + min;
        var dateTime = date+' '+time;
        return {time, dateTime}
    }

    /* String för event (loggen) */
    function getEventString(newPosition) {
        var {time, dateTime} = getTime();
        var movedBy = myContext.userHook.value.user;
        var event = `${dateTime} \n 
        Moved(update)(bikeId:${props.id}) 
        from position: lat: ${props.position.lat} lng: ${props.position.lng} to the ${moveBikeToColor} zon. 
        New exact position in zon: lat: ${newPosition.lat}, lng: ${newPosition.lng} .
        Speed is now 0 and battery is charged from ${props.battery} to 100%.
        Carried out by ${movedBy}.
    `;
        return event
    }

    /* Räknar ut ny position inom den zon som scootern ska flyttas till
        Om den nya zonen ej är inom området så anropas denna funktionen igen
        för att hitta en ny position som stämmer. Matten är inte exakt.
    */
    function calculateScooterNewPosition() {
        let newPosition;
        let position = props.position;
        var insidePoly = false;

        charging_posts.filter(elem=> elem.color.includes(moveBikeToColor) ? newPosition = elem.position : position = null)
        let lat = newPosition.polygonePart1.lat + (Math.random() * (newPosition.polygonePart4.lat - newPosition.polygonePart1.lat)); // lat = y
        let lng = newPosition.polygonePart1.lng + (Math.random() * (newPosition.polygonePart4.lng - newPosition.polygonePart1.lng)); //lng = x
        var polygone= [
            [newPosition.polygonePart1.lat, newPosition.polygonePart1.lng],
            [newPosition.polygonePart2.lat, newPosition.polygonePart2.lng],
            [newPosition.polygonePart3.lat, newPosition.polygonePart3.lng],
            [newPosition.polygonePart4.lat, newPosition.polygonePart4.lng]
        ]
        newPosition = {lat: lat, lng: lng}

        var newPositionArr = [newPosition.lat, newPosition.lng]
        var pointInPolygon = require('point-in-polygon');
        var insidePoly = pointInPolygon(newPositionArr, polygone);

        if(!insidePoly) {
            calculateScooterNewPosition()
        }
        return newPosition
    }


    /* Kontrollerar om start pos för cykel finns i en zon mha helper function
       Om, uppdatera den zonen. uppdaterar också zonen för slutposition
    */
    async function updateZon() {
        let startCoords = props.position;
        let amount_of_bikes;
        let color;
        startCoords = [startCoords.lat, startCoords.lng]
        let coordInParkingZone = checkIfCoordInParkingZone(startCoords, allParkingZones)
        let coordInChargingPost = checkIfCoordInChargingPost(startCoords, charging_posts)
        //Uppdaterar zon med -1 om cykel tidigare fanns i en parkeringszon
        if(coordInParkingZone && coordInParkingZone.returned) {
            amount_of_bikes = coordInParkingZone.amount_of_bikes_zone - 1;
            color = coordInParkingZone.color;

            await Api.updateNrBikesParkZone(city, amount_of_bikes, color);

        //Uppdaterar zon med -1 om cykel tidigare fanns i en laddstation
        } else if (coordInChargingPost && coordInChargingPost.returned) {
            amount_of_bikes = coordInChargingPost.amount_of_bikes_post - 1;
            color = coordInChargingPost.color;

            await Api.updateNrBikesChargePost(city, amount_of_bikes, color);
        }
        // Uppdaterar alltid den nya zonen(laddstation) med +1
        let res = await Api.getAllChargePost(city, moveBikeToColor);
        let amount_of_bikes_in_new_zone = res[0].amount_of_bikes_post + 1;

        await Api.updateNrBikesChargePost(city, amount_of_bikes_in_new_zone, moveBikeToColor);
    }

    useEffect(() => {
        setTimeout(() => setMessage(""), 5000);
        setMoveBikeToColor("")
    }, [message])


	return (
        <StyleMoveBike onClick = {getLoadStationsForMovingBike}> {/* laddar in ny info med onClick */}
            {message && <p style={{color:"red"}}> {message} </p>} {/* meddelande om det går bra/dåligt med uppdatering */}
            <select 
                data-testid="dropdown" onChange={(e) => {
                    setMoveBikeToColor(e.target.value)
            }}
            value={moveBikeToColor}
            >
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


