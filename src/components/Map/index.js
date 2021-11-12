import {React, useEffect, useState, useRef } from "react";
//googlemap
import GoogleMapReact from "google-map-react";
//components
import useCurrentLocation from "../../Hooks/currentPosition";
import PersonMarker from "./personMarker";
//styles
import {Style, BtnStyle} from './Form.styles'
import bikeimg from '../../images/bike.png'
import personimg from '../../images/person.png'



const options = {
	enableHighAccuracy: true,
	timeout: 1000 * 60 * 1, // 1 min
	maximumAge: 1000 * 60 * 60, // 1 hour
  };


export default function MapContainer(props) {
	const { location, err } = useCurrentLocation(options);
	const mapRef = useRef();
	const [zoom, setZoom] = useState(10);
	const [bounds, setBounds] = useState(null);
	const showBikesOrNot = props.bikes.getbike;
	var bikeArray = props.bikes.content;

	bikeArray =  bikeArray.slice(0, 200); // innan jag fixar med cluster


	const Marker = ({children}) => children;


	return (
		<Style>
			{location ? (
			<GoogleMapReact 
				bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
				defaultCenter={{ lat: location.latitude, lng: location.longitude}}
				defaultZoom={3}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded= {({map}) => {
					mapRef.current = map;
				}}
				onChange={({zoom, bounds}) => {
					setZoom(zoom)
					setBounds([
						bounds.nw.lng,
						bounds.se.lat,
						bounds.se.lng,
						bounds.nw.lat
					])
				}}
			>

			<PersonMarker/>
			<Marker 
				key={1} 
				lat={location.latitude} 
				lng={location.longitude}>	
				<BtnStyle>
					<button onClick= {() => {
						<div>HEJ</div>
						}}
						className="crime-marker">
						<img className = "scooter" src={personimg} alt="scooter"/>
					</button>
				</BtnStyle>
			</Marker>
			{showBikesOrNot ? (
			bikeArray.map(bike => {
			return (
			<Marker 
				key={bike.id} 
				lat={bike.location.latitude} 
				lng={bike.location.longitude}>	
				<BtnStyle>
					<button onClick= {() => {
						<div>HEJ</div>
						}}
						className="crime-marker">
						<img className = "scooter" src={bikeimg} alt="scooter"/>
					</button>
				</BtnStyle>
			</Marker>
			)
			})
			) : (console.log("HE"))}
			
			</GoogleMapReact>
			):(<p>Loading...</p> )}
		</Style>	

	);
}


