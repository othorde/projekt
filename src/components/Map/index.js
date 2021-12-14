import {React, useEffect, useState, useRef } from "react";
//googlemap
import GoogleMapReact from "google-map-react";
//hooks
import useCurrentLocation from "../../Hooks/useCurrentPosition";
import useDisplayPolyChargeStation from "../../Hooks/useDisplayPolyChargeStation";
import useDisplayPolyParkZone from "../../Hooks/useDisplayPolyParkZone";
import useDisplayPolyCities from "../../Hooks/useDisplayPolyCities";
//components
import PopUp from "../PopUp";
import Logg from "../Logg";
import Loader from "../Loader"
//styles & img
import {Container,StyleMap, Main} from './Form.styles'
import bikeimg from '../../images/bike.png'
import personimg from '../../images/person.png'

// options till userLocation
const options = {
	enableHighAccuracy: true,
	timeout: 1000 * 60 * 1, // 1 min
	maximumAge: 1000 * 60 * 60, // 1 hour
};

/* Denna komponent är kartan till admin.
   Populerar kartan genom att hämta från api. Scootrar hämtas direkt
   från props(Admin route). För att kunna lägga till polygons hämtas dessa med 
   Hooks, se mappen hooks.
*/
export default function MapContainer(props) {
	//hooks
	const mapRef = useRef();
	const { loadStationContent, showInfoForLoadStation } = useDisplayPolyChargeStation(mapRef, props);
	const { cityContent, showInfoForCity } = useDisplayPolyCities(mapRef, props);
	const { parkingZoneContent, showInfoForParkingZone } = useDisplayPolyParkZone(mapRef, props);
	const { location } = useCurrentLocation(options);
	//State
	const [scooter, setScooter] = useState([]);
	const [PopupInfo, setPopupInfo] = useState(null);
	///Variabel
	const loadScooters = props.ifToShowScooter;
	const ScooterArray = props.ifToShowScooter.content;
	// Marker på kartan 1 person
	const Marker = ({ children }) => <div>{children}</div>;


	/*  Dessa useEffect sätter de andra värdena till false så att rätt info visas i rutan för innehåll (PopUp)*/ 
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
				{/* Visar karta */}
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
					{/*Visar användaren på kartan */}
					<Marker 
						key={1} 
						lat={location.latitude} 
						lng={location.longitude}
						>
						<div >
							<img className = "crime-marker" src={personimg} alt="person" />
						</div>	
					</Marker>

					{/*Visar alla scootrar*/}
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
				):(<Loader/> )}
			</StyleMap>

			{/*Visar POPUP fönster, info skickas hit beroende på vad användaren vill se*/}
			{scooter || cityContent || loadStationContent ? (
				<PopUp key={"popupkey"} PopupInfo={PopupInfo}></PopUp>
			): (null) }
			</Main>
			<Logg scooter= {scooter}/>	
		</Container>
	);
}
