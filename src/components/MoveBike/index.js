import {React, useState, useContext} from "react";
import Api from "../../api";
import AppContext from "../../AppContext";

export default function MoveBike(props) {
    const myContext = useContext(AppContext);
    const [charging_posts, setCharging_posts] = useState([])
    const [moveBikeToColor, setMoveBikeToColor] = useState({})


    /* funktionen hämtar den stad där cykeln befinner sig 
       loopar igenom och sparar position och färgkod för laddningsstationen 
       Kontrollera denna när vi har fler laddningsstationer
       Bör va graphQl sen
       */
    async function getLoadStationsForMovingBike() {
        let city = await Api.getACity(props.city);
        city[0].charging_posts.map(elem => {
            setCharging_posts([elem])
        })
    }

    // Vad behöver uppdateras?
    // Scooterns plats ny long lat
    // Uppdatera hur många som finns i föregående zon
    // uppdatera hur många som finns i den nya zonen
    // Fortsätt här när backend är klar
    // glöm ej att hantera fail och error
    // var lat = y_min + (Math.random() * (y_max - y_min)); // lat = y
    // var lng = x_min + (Math.random() * (x_max - x_min)); //lng = x
    /* Får vilken färgkod som scootern ska skickas till
        kontrollerar med färger för staden
        räknar ut nya koordinater. random plats inom zonen.
        Uppdaterar, antal cyklar i nuvarande zon samt ny zon
    */
    const handleSubmit = async () => {

        if (moveBikeToColor !== null) {
            let position = props.position;
            let newPosition;
            let movedBy = myContext.user.username;
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;
            
            charging_posts.filter(elem=> elem.color.includes(moveBikeToColor) ? newPosition = elem.position : position = null)
            if ( position !== null) {
                var lat = newPosition.polygonePart1.lat + (Math.random() * (newPosition.polygonePart4.lat - newPosition.polygonePart1.lat)); // lat = y
                var lng = newPosition.polygonePart1.lng + (Math.random() * (newPosition.polygonePart4.lng - newPosition.polygonePart1.lng)); //lng = x
                newPosition = {lat: lat, lng: lng}

                var logg = `${dateTime} \n 
                    Moved(update) this bike (bikeId:${props.id}) 
                    from position: lat: ${props.position.lat} lng: ${props.position.lng} to the ${moveBikeToColor} zon. 
                    New exact position in zon: lat: ${newPosition.lat}, lng: ${newPosition.lng} .
                    Speed is now 0 and battery is charged from ${props.battery} to 100%.
                    This was carried out by ${movedBy}.
                `;
                let speed = "0";
                let battery = "100";
                let response = await Api.updateAScooter(props.id, speed, battery, newPosition, logg);
                console.log(response)
                
            }
        }
    }

	return (
        <div onClick = {getLoadStationsForMovingBike}> {/* laddar in ny info med onClick */}
            <select 
                data-testid="dropdown" onChange={(e) => {
                setMoveBikeToColor((e.target.value))
            }}>
                <option value={'noValue'}>-- Välj vart cykeln ska förflyttas --</option>
                {charging_posts.map(elem => elem !== null  &&
                    <option key={elem.color}value={elem.color}>
                    {elem.color + " zon"}
                    </option> )}
            </select>
            <div> <button onClick={handleSubmit}> Förflytta cykel </button> </div>
        </div>
	);
}


