
import {React, useState } from "react";
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
            <div> Scooter ID: {content._id} Batteri: {content.battery}</div>
            <div> Stad: {content.city_location} Position, Latitude: {content.position.lat} Longitude: {content.position.long} </div>
            <div> Hastighet {content.speed} </div>
            <div> Starttid {content.start_time} </div>
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
            <>
            <div> Stad {content.city}</div>
            <div> Antal cyklar {content.amount_of_bikes} </div>
            </>
            ) : null } 
 
        {  whatToShow === "LoadStation" ? (
            <>
            <div> Position (Visar endast 2 av positionerna nu) 
                {content.position.polygonePart1.lat }
                { content.position.polygonePart2.lng }
            </div>
            <div> Antal cyklar ??????</div>
            </>
            ) : null } 
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

