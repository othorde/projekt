import {React, useEffect, useState, useRef } from "react";
//googlemap
import GoogleMapReact from "google-map-react";
//components
import useCurrentLocation from "../../Hooks/currentPosition";
import useLoadStationsToMap from "../../Hooks/loadStationsToMap";
import useCityToMap from "../../Hooks/loadCitysToMap";

import PopUp from "./popup";
import LoadCitys from "./helperFunctions/loadCitys"
import Api from "../../api";
//styles & img
import {Style} from './Form.styles'
import bikeimg from '../../images/bike.png'
import personimg from '../../images/person.png'

// options till userLocation
const options = {
	enableHighAccuracy: true,
	timeout: 1000 * 60 * 1, // 1 min
	maximumAge: 1000 * 60 * 60, // 1 hour
};


export default function MapContainer(props) {
	//hooks
	const mapRef = useRef();
	const { loadStationContent, err1 } = useLoadStationsToMap(mapRef, props);
	const { cityContent, errorForCity } = useCityToMap(mapRef, props);

	const { location, err } = useCurrentLocation(options);
	const [markerInfo, setMarkerInfo] = useState([]);
	const [PopupInfo, setPopupInfo] = useState([]);

	///Variabel
	const loadScooters = props.ifToShowScooter;
	console.log(loadScooters)

	var ScooterArray = props.ifToShowScooter.content;
	// bikeArray =  bikeArray.slice(0, 200); // innan jag fixar med cluster max 200
	const Marker = ({ children }) => <div>{children}</div>;

	useEffect(() => {
		if (cityContent.showCity == true) {
			setPopupInfo({
				showCity: cityContent.showCity,
				showScooter: false,
				showLoadStation: false,
				showAccLocation: false,
				content: cityContent.city
			})
		}
	},[cityContent.showCity])

	useEffect(() => {
		if (markerInfo.showScooter == true) {
			setPopupInfo({
				showCity: false,
				showScooter: markerInfo.showScooter,
				showLoadStation: false,
				showAccLocation: false,
				content: markerInfo.scooter
			})
		}
	},[markerInfo.showScooter])

	return (
		<Style>
			{/* 		KARTA		 */}
			{location ? (
			<GoogleMapReact 
				bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
				defaultCenter={{ lat: location.latitude, lng: location.longitude}}
				defaultZoom={10}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded= {({map, maps}) => {
					mapRef.current = {map, maps};
				}}
			>
				{/* 		1 Person 		*/}
				<Marker 
					key={1} 
					lat={location.latitude} 
					lng={location.longitude}
					>
					<div >
						<img className = "crime-marker" src={personimg} alt="person" />
					</div>	
				</Marker>
				{/* 		Alla cyklar		 */}
				{loadScooters.loadScooters ? (
				ScooterArray.map(scooter => {
				return (
				<Marker 
					key={scooter._id} 
					lat={scooter.position.lat} 
					lng={scooter.position.lng}
					>
					<div onClick={() => setMarkerInfo({scooter, showScooter: true})}className="crime-marker">
					<img className = "scooter" src={bikeimg} alt="scooter"/>
					</div>
				</Marker>)
				})
				) : (null)}
			</GoogleMapReact>
			):(<p>Loading...</p> )}
			{/*				 POPUP				 */}
			{markerInfo || cityContent || loadStationContent ? (
			<PopUp
				key={"popupkey"}
				PopupInfo={PopupInfo}
				>
			</PopUp>
			): (null) }
		</Style>
	);
}


