
import {React} from "react";
//styles
import {PopUpStyle} from './Form.styles'
import MoveBike from "../MoveBike";

export default function PopUp(props) {
    let content;
    let whatToShow;

    if (props.PopupInfo && props.PopupInfo.content ) {
        content = props.PopupInfo.content
        whatToShow = props.PopupInfo.whatToShow
    }

	return (
		<PopUpStyle >
        { whatToShow === "Scooter" ? (
            <>
        <table>
            <caption>{whatToShow}</caption>
            <thead>
                <tr>
                    <th scope="col">Scooter ID</th>
                    <th scope="col">Batteri</th>
                    <th scope="col">Stad</th>
                    <th scope="col">Latitude</th>
                    <th scope="col">Longitude</th>
                    <th scope="col">Starttid</th>
                    <th scope="col">Hastighet</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                <td data-label="Scooter ID"> {content._id} </td>
                <td data-label="Batteri"> {content.battery} </td>
                <td data-label="Stad">{content.city_location} </td>
                <td data-label="Latitude"> {content.position.lat} </td>
                <td data-label="Longitude"> {content.position.lng} </td>
                <td data-label="Starttid" > {content.start_time}</td>
                <td data-label="Hastighet" > {content.speed}</td>
                </tr>
            </tbody>
            </table>
                {console.log("ta bort sen")}
            <MoveBike 
                id = {content._id}
                city = {content.city_location}
                position = {content.position}
                battery = {content.battery}
                speed = {content.speed}
                >
            </MoveBike>
            </>
            ) : null }
    
        { whatToShow === "City" ? (
        <table>
            <caption>{whatToShow}</caption>
            <thead>
                <tr>
                    <th scope="col">Stad</th>
                    <th scope="col">Antal cyklar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td data-label="Stad"> {content.city} </td>
                <td data-label="Antal cyklar"> {content.amount_of_bikes} </td>
                </tr>
            </tbody>
        </table>
        ) : null } 
 
        {whatToShow === "LoadStation" ? (
                    <table>
                    <caption>{whatToShow}</caption>
                    <thead>
                        <tr>
                            <th scope="col">Latitude</th>
                            <th scope="col">Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td data-label="Latitude"> {content.position.polygonePart1.lat} </td>
                        <td data-label="Longitude"> {content.position.polygonePart2.lng} </td>
                        </tr>
                    </tbody>
                </table>
                ) : null } 
            <>
            </>
		</PopUpStyle>	
	);
}



//  fungerar som REACt component till kartan

// import React from "react";

// const PopUp = ({ text, tooltip, store }) => (
//   <div className="circle">
//     <span className="circleText" title={tooltip}>
//       {text, store}
//     </span>
//   </div>
// );

// export default PopUp;

