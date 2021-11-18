
import {React } from "react";
//styles
import {PopUpStyle} from './Form.styles'


export default function PopUp(props) {
    console.log(props.PopupInfo.content)

    // const city = 

	return (
		<PopUpStyle >
         
        { props.PopupInfo.showScooter ? (
            
            <>
            <div> Scooter ID: {props.PopupInfo.content._id} Batteri: {props.PopupInfo.content.battery}</div>
            <div> Stad: {props.PopupInfo.content.city_location} Position, Latitude: {props.PopupInfo.content.position.lat} Longitude: {props.PopupInfo.content.position.long} </div>
            <div>Hastighet {props.PopupInfo.content.speed} </div>
            <div>Starttid {props.PopupInfo.content.start_time} </div>
            <div> <button> Förflytta cykel </button> {props.PopupInfo.content.category}</div>
            </>
            ) : null }

        { props.PopupInfo.showCity ? (
            <>
            <div> Stad {props.PopupInfo.content.city}</div>
            <div> Antal cyklar {props.PopupInfo.content.amount_of_bikes} {}</div>
            </>
            ) : null } 

        {/* { props.what2Show.ifToShowLoadStations ? (
            <>
            <div> Stad {props.city.city.city}</div>
            <div> Antal cyklar {props.city.content.amount_of_bikes} {}</div>
            </>
            ) : null }  */}

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

