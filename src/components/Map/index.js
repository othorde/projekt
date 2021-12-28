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
import fullyChargedBike from '../../images/fullyChargedBike.png';
import halfChargedBike from '../../images/halfchargedbike.png';
import noChargeBike from '../../images/noChargeBike.png';

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
	const { loadStationContent } = useDisplayPolyChargeStation(mapRef, props);
	const { cityContent } = useDisplayPolyCities(mapRef, props);
	const { parkingZoneContent } = useDisplayPolyParkZone(mapRef, props);
	const { location } = useCurrentLocation(options);
	//State
	const [scooter, setScooter] = useState([]);
	const [PopupInfo, setPopupInfo] = useState(null);
	///Variabel
	const loadScooters = props.ifToShowScooter;
	const ScooterArray = props.ifToShowScooter.content;
	// Marker på kartan 1 person
	const Marker = ({ children }) => <div>{children}</div>;

	/*  Dessa useEffect sätter de andra värdet så att rätt info visas i rutan för innehåll (PopUp)
		Beroende på vad användaren vill se.
	*/ 
	useEffect(() => {
		scooter.showScooter && setPopupInfo({content: scooter.scooter, whatToShow: "Scooter"});
	},[scooter.showScooter, scooter, setScooter])

	useEffect(() => {
		loadStationContent.showLoadStations && setPopupInfo({content: loadStationContent.loadStations, whatToShow: "LoadStation"});
	},[loadStationContent.showLoadStations, loadStationContent.loadStations])

	useEffect(() => {
		cityContent.showLoadCitys && setPopupInfo({content: cityContent.city, whatToShow: "City"});
	},[cityContent.showLoadCitys, cityContent.city])

	useEffect(() => {
		parkingZoneContent.showParkingZone && setPopupInfo({content: parkingZoneContent.loadParkingZone, whatToShow: "ParkingZone"});
	},[parkingZoneContent.showParkingZone, parkingZoneContent.loadParkingZone])

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
							
							{ scooter.battery < 99  ? <img className = "scooter" src={halfChargedBike} alt="scooter"/>
							: scooter.battery <= 96  ? <img className = "scooter" src={noChargeBike} alt="scooter"/>
							: <img className = "scooter" src={fullyChargedBike} alt="scooter"/>
							}
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
