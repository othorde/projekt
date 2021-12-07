import {React, useEffect, useState, useRef } from "react";
//googlemap
import GoogleMapReact from "google-map-react";
//components
import useCurrentLocation from "../../Hooks/currentPosition";
import useLoadStationsToMap from "../../Hooks/loadStationsToMap";
import useLoadParkingZones from "../../Hooks/loadParkingZoneToMap";
import useCityToMap from "../../Hooks/loadCitysToMap";
import PopUp from "../PopUp";
import Logg from "../Logg";
//styles & img
import {Container,StyleMap, Main} from './Form.styles'
import bikeimg from '../../images/bike.png'
import personimg from '../../images/person.png'

// options till userLocation hur länge den ska vara
const options = {
	enableHighAccuracy: true,
	timeout: 1000 * 60 * 1, // 1 min
	maximumAge: 1000 * 60 * 60, // 1 hour
};

/* Denna komponent är kartan till admin. Den kan nyttjas via mapref.
   Populerar kartan genom att hämta från api. Scootrar hämtas direkt
   från props. För att kunna lägga till polygons hämtas dessa med 
   Hooks , se mappen hooks.
*/
export default function MapContainer(props) {
	//hooks
	const mapRef = useRef();
	const { loadStationContent, showInfoForLoadStation } = useLoadStationsToMap(mapRef, props);
	const { cityContent, showInfoForCity } = useCityToMap(mapRef, props);
	const { parkingZoneContent, showInfoForParkingZone } = useLoadParkingZones(mapRef, props);

	const { location } = useCurrentLocation(options);
	const [scooter, setScooter] = useState([]);
	const [PopupInfo, setPopupInfo] = useState(null);

	///Variabel
	const loadScooters = props.ifToShowScooter;
	const ScooterArray = props.ifToShowScooter.content; 	// ScooterArray =  bikeArray.slice(0, 200); // innan jag fixar med cluster max 200
	const Marker = ({ children }) => <div>{children}</div>;

	// Dessa useEffect sätter de andra värdena till false så att rätt info visas i rutan för innehåll
	//fundera på om det finns något bättre/snyggare sätt om man ska kunna toggla mellan de olika
	// Alternativ är att ladda in allt här, men då blir index.js kladdig 
	// Har flera fetch vilket är ganska onödigt men om vi ska använda graphql senare så är strukturen m hooks att föredra.
	// Om vi inte använder graphQl så hämta allt på en gång kanske och spara i state => populera
	useEffect(() => {
		if (scooter.showScooter === true) {
			showInfoForCity(false);
			showInfoForLoadStation(false);
			showInfoForParkingZone(false);
			setPopupInfo({content: scooter.scooter, whatToShow: "Scooter"});
		}
	},[scooter.showScooter, scooter, setScooter])


	useEffect(() => {
		if (loadStationContent.showLoadStations === true) {
			setScooter(prevState => ({
				scooter: prevState.scooter,
				showScooter: false
			}));
			showInfoForCity(false);
			showInfoForParkingZone(false);
			setPopupInfo({content: loadStationContent.loadStations, whatToShow: "LoadStation"});
		}
	},[loadStationContent.showLoadStations])


	useEffect(() => {
		if (cityContent.showLoadCitys === true) {
			setScooter(prevState => ({
				scooter: prevState.scooter,
				showScooter: false
			}));
			showInfoForLoadStation(false);
			showInfoForParkingZone(false);
			setPopupInfo({content: cityContent.city, whatToShow: "City"});
		}
	},[cityContent.showLoadCitys])

	useEffect(() => {
		if (parkingZoneContent.showParkingZone === true) {
			setScooter(prevState => ({
				scooter: prevState.scooter,
				showScooter: false
			}));
			showInfoForCity(false);
			showInfoForLoadStation(false);
			setPopupInfo({content: parkingZoneContent.loadParkingZone, whatToShow: "ParkingZone"});
		}
	},[parkingZoneContent.showParkingZone])



	return (

		<Container>
			<Main> 
			<StyleMap>
				{/*KARTA*/}
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
					{/*1 Person*/}
					<Marker 
						key={1} 
						lat={location.latitude} 
						lng={location.longitude}
						>
						<div >
							<img className = "crime-marker" src={personimg} alt="person" />
						</div>	
					</Marker>

					{/*Alla scootrar*/}
					{loadScooters.loadScooters && (
					ScooterArray.map(scooter => {
						return (
						<Marker 
							key={scooter._id} 
							lat={scooter.position.lat} 
							lng={scooter.position.lng}
							>
							<div onClick={() => setScooter({scooter, showScooter: true})}className="crime-marker">
							<img className = "scooter" src={bikeimg} alt="scooter"/>
							</div>
						</Marker>)
						})
					)}
				</GoogleMapReact>
				):(<p>Loading...</p> )}
			</StyleMap>
			

			{/*POPUP fönster*/}
			{scooter || cityContent || loadStationContent ? (
				<PopUp key={"popupkey"} PopupInfo={PopupInfo}></PopUp>
			): (null) }
			</Main>
			<Logg scooter= {scooter}/>	

		</Container>
	);
}
