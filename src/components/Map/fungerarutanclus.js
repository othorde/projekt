import {React, useEffect, useState, useRef } from "react";
//googlemap
import GoogleMapReact from "google-map-react";
//components
import useCurrentLocation from "../../Hooks/currentPosition";
import useSuperCluster from 'use-supercluster';
//styles
import {Style, BtnStyle} from './Form.styles'
import scooter from '../../images/bike.png'
import useSwr from "swr";
const options = {
	enableHighAccuracy: true,
	timeout: 1000 * 60 * 1, // 1 min
	maximumAge: 1000 * 60 * 60, // 1 hour
  };



// style annorlunda jmf med komponenter. Se form.styles,  
export default function MapContainer() {
	const { location, err } = useCurrentLocation(options);
	console.log(location)

	const mapRef = useRef();
	const [zoom, setZoom] = useState(10);
	const [bounds, setBounds] = useState(null);
	const url = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2020-01"

	const fetcher = (...args) => fetch(...args).then(response => response.json()); //gör om denna sen
	const Marker = ({children}) => children;

	const {data, error} = useSwr(url, fetcher) //gör om denna sen
	const crimes = data && !error ? data.slice(0, 200) : [];

	//clusters
	
	return (
		<Style>
			{location ? (

			<GoogleMapReact 
				bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
				defaultCenter={{ lat: location.latitude, lng: location.longitude}}
				defaultZoom={4}
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
			{crimes.map(crime => {
			
				return (
				<Marker 
					key={crime.id} 
					lat={crime.location.latitude} 
					lng={crime.location.longitude}>
						
					<BtnStyle>
						<button onClick= {() => {
								<div>HEJ</div>
							}}
							className="crime-marker">
							<img className = "scooter" src={scooter} alt="scooter"/>
						</button>
					</BtnStyle>
				</Marker>
				)
			})}
			</GoogleMapReact>
			):(<p>Loading...</p> )}
		</Style>	

	);
}


