import {React, useState, useContext, useEffect} from "react";
import Api from "../../api";
import AppContext from "../../AppContext";
import {StyleMoveBike} from './Form.styles.js'

export default function MoveBike(props) {
    const myContext = useContext(AppContext);
    const [charging_posts, setCharging_posts] = useState([])
    const [moveBikeToColor, setMoveBikeToColor] = useState({})
    const [message, setMessage] = useState("")

    /* Får vilken färgkod som scootern ska skickas till
        kontrollerar med färger för staden
        räknar ut nya koordinater. random plats inom zonen.
        Uppdaterar, antal cyklar i nuvarande zon samt ny zon
    */


    /* funktionen hämtar den stad där cykeln befinner sig 
       loopar igenom och sparar position och färgkod för laddningsstationen 
       Kontrollera denna när vi har fler laddningsstationer
       Bör va graphQl sen
    */

    async function getLoadStationsForMovingBike() {
        let city = await Api.getACity(props.city);
        city[0].charging_posts.forEach(elem => {
            setCharging_posts([elem])
        })
    }

    const handleSubmit = async () => {

        if (moveBikeToColor !== "noValue") {
            updateScooter();
            updateScootersUser();
            updateScooterLogg();
            // updateScooterZones();

        }
    }

    async function updateScooter() {

        var position = props.position;
        var newPosition;
        var speed = "0";
        var battery = "100";
        var response;
        charging_posts.filter(elem=> elem.color.includes(moveBikeToColor) ? newPosition = elem.position : position = null)
        newPosition = calculateScooterNewPosition()
        if (position !== null) {
            response = await Api.updateAScooter(props.id, speed, battery, newPosition); //uppdaterar scootern
            console.log(response)
            if(response === `Object: ${props.id} updated`) {
                return true;
            }
       }
    }

    async function updateScootersUser() {

        var response = await Api.updateAScootersUser(props.id);  //uppdaterar scooterns användare
        console.log(response)
        if(response === `Object: ${props.id} updated`) {
            return true;
        }
    }

    async function updateScooterLogg() {

        var active_user = "null";
        var event = getEventString();
        var {time, dateTime} = getTime();
        var newPosition = calculateScooterNewPosition();

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
            console.log("HÄÄÄÄÄÄÄR")
            setMessage("Cykel förflyttad, logg uppdaterad")
        } else {
            setMessage("Något gick fel")
        }  
    }

    /* UPPDATERA ZONER */

    /* Tid för eventet (loggen) */
    function getTime() {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth())+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return {time, dateTime}
    }

    /* String för event (loggen) */
    function getEventString() {

        var newPosition = calculateScooterNewPosition();
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
        Kontrollera denna uträkningen */
    function calculateScooterNewPosition() {
        var newPosition;
        var position = props.position;
        charging_posts.filter(elem=> elem.color.includes(moveBikeToColor) ? newPosition = elem.position : position = null)
        let lat = newPosition.polygonePart1.lat + (Math.random() * (newPosition.polygonePart4.lat - newPosition.polygonePart1.lat)); // lat = y
        let lng = newPosition.polygonePart1.lng + (Math.random() * (newPosition.polygonePart4.lng - newPosition.polygonePart1.lng)); //lng = x
        newPosition = {lat: lat, lng: lng}
        return newPosition
    }

    useEffect(() => {
        setTimeout(() => setMessage(""), 5000);
    }, [message])

	return (
        <StyleMoveBike onClick = {getLoadStationsForMovingBike}> {/* laddar in ny info med onClick */}
            {message && <p style={{color:"red"}}> {message} </p>} {/* meddelande om det går bra/dåligt med uppdatering */}
            <select 
                data-testid="dropdown" onChange={(e) => {
                setMoveBikeToColor((e.target.value))
            }}
            value = {moveBikeToColor}
            >
            <option value={'noValue'}>-- Välj vart cykeln ska förflyttas --</option>
            {charging_posts.map(elem => elem !== null  &&
                <option key={elem.color}value={elem.color}>
                {elem.color + " zon"}
                </option> )}
            </select>
            <button onClick={handleSubmit}> Förflytta cykel </button>
        </StyleMoveBike>
	);
}


