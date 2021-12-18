import {React} from "react";
//komponent
import MoveBike from "../MoveBike";
//styles
import {PopUpStyle} from './Form.styles';

/* Denna komponent visar i princip bara upp allt innehåll som skickas till den 
   genom onclickevent på ikoner som finns på kartan. Informationen skickas hit 
   som sedan populerar tabellen. Props skickas vidare till movebike om admin
   vill förflytta cykel
*/
export default function PopUp({PopupInfo}) {
    let content;
    let whatToShow;

    if (PopupInfo && PopupInfo.content ) {
        content = PopupInfo.content
        whatToShow = PopupInfo.whatToShow
    }
	return (
		<PopUpStyle >
        {/* Scooter */}
        { whatToShow === "Scooter" ? (
            <>
        <table>
            <caption>{whatToShow}</caption>
            <tbody>
                <tr key={content._id}>
                <td data-label="Scooter ID"> {content._id} </td>
                <td data-label="Aktiv"> {content.is_active === true ? "I användning" : "Används ej"} </td>
                <td data-label="Användare"> {content.active_user === null ? "Ingen användare" : content.active_user} </td>
                <td data-label="Batteri"> {content.battery} </td>
                <td data-label="Stad">{content.city_location} </td>
                <td data-label="Latitude"> {content.position.lat} </td>
                <td data-label="Longitude"> {content.position.lng} </td>
                <td data-label="Starttid" > {content.start_time}</td>
                <td data-label="Hastighet" > {content.speed}</td>
                </tr>
            </tbody>
            </table>
            <MoveBike 
                id = {content._id}
                city = {content.city_location}
                position = {content.position}
                battery = {content.battery}
                speed = {content.speed}
                is_active = {content.is_active}
                active_user = {content.active_user}
                >
            </MoveBike>
            </>
            ) : null }
    
        { whatToShow === "City" ? (
        <table>
            <caption>{whatToShow}</caption>
            <tbody>
                <tr key={content.city}>
                <td data-label="Stad"> {content.city} </td>
                <td data-label="Antal cyklar"> {content.amount_of_bikes} </td>
                </tr>
            </tbody>
        </table>
        ) : null } 
        {/* LaddStation */}
        {whatToShow === "LoadStation" ? (
            <table>
                <caption>Laddstation ({content.color})</caption>
                <tbody>
                    <tr key = {content.color}>
                    <td data-label="Antal cyklar"> {content.amount_of_bikes_post} </td>
                    <td data-label="Färgkod"> {content.color} </td>
                    </tr>
                </tbody>
            </table>
        ) : null }
        {/* Parkeringszon */}
        {whatToShow === "ParkingZone" ? (
            <table>
                <caption>Parkeringzon ({content.color})</caption>
                <tbody>
                    <tr key = {content.color}>
                        <td data-label="Antal cyklar"> {content.amount_of_bikes_zone} </td>
                        <td data-label="Färgkod"> {content.color} </td>
                    </tr>
                </tbody>
            </table>
        ) : null } 
		</PopUpStyle>	
	);
}
