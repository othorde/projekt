// import {React, useEffect, useState, useRef } from "react";
// //googlemap
// import GoogleMapReact from "google-map-react";
// //components
// import useCurrentLocation from "../../Hooks/currentPosition";
// import useSuperCluster from 'use-supercluster';
// //styles
// import {Style, BtnStyle} from './Form.styles'
// import scooter from '../../images/scooter.png'
// import useSwr from "swr";
// const options = {
// 	enableHighAccuracy: true,
// 	timeout: 1000 * 60 * 1, // 1 min
// 	maximumAge: 1000 * 60 * 60, // 1 hour
//   };



// // style annorlunda jmf med komponenter. Se form.styles,  
// export default function MapContainer() {
// 	const { location, err } = useCurrentLocation(options);
// 	console.log(location)

// 	const mapRef = useRef();
// 	const [zoom, setZoom] = useState(10);
// 	const [bounds, setBounds] = useState(null);
// 	const url = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2020-01"

// 	const fetcher = (...args) => fetch(...args).then(response => response.json()); //gör om denna sen
// 	const Marker = ({children}) => children;

// 	const {data, error} = useSwr(url, fetcher) //gör om denna sen
// 	const crimes = data && !error ? data : [];

// 	//clusters
// 	const points = crimes.map(crime => ({
// 		type: "Feature",
// 		properties: {
// 			cluster: false,
// 			crimeId: crime.id,
// 			category: crime.category
// 		},
// 		geometry: {
// 			type: "Point", 
// 			coordinates:[
// 				parseFloat(crime.location.longitude), 
// 				parseFloat(crime.location.latitude)
// 			]}
// 	}))

// 	const { clusters, supercluster } = useSuperCluster({
// 		points, 
// 		bounds,
// 		zoom,
// 		options: {radius:75, maxZoom:20}
// 	});
// 	return (
// 		<Style>
// 			{location ? (

// 			<GoogleMapReact 
// 				bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
// 				defaultCenter={{ lat: location.latitude, lng: location.longitude}}
// 				defaultZoom={4}
// 				yesIWantToUseGoogleMapApiInternals
// 				onGoogleApiLoaded= {({map}) => {
// 					mapRef.current = map;
// 				}}
// 				onChange={({zoom, bounds}) => {
// 					setZoom(zoom)
// 					setBounds([
// 						bounds.nw.lng,
// 						bounds.se.lat,
// 						bounds.se.lng,
// 						bounds.nw.lat
// 					])
// 				}}
				
// 			>
// 			{clusters.map(cluster => {
// 				const[longitude, latitude] = cluster.geometry.coordinates;
// 				const {cluster : isCluster, point_count: pointCount} = cluster.properties;
// 				if (isCluster) {
// 					return (
// 						<Marker key={cluster.id} 
// 							lat={latitude} 
// 							lng={longitude}>
// 								<div 
// 									className="cluster-marker"
// 									style={{
// 										width: `${10 + (pointCount/points.length)* 20}px`,
// 										height: `${10 + (pointCount/points.length)* 20}px`
// 									}}
// 									onClick= {() => {
// 										const expansionZoom = Math.min(
// 											supercluster.getClusterExpansionZoom(cluster.id),
// 											30
// 										);
// 										mapRef.current.setZoom(expansionZoom) //zoomar in om man klickar på en cluster
// 										mapRef.current.panTo({lat: latitude, lng: longitude});  //sätter zoom till rätt koordinat
// 									}}
// 									>
// 								{pointCount}</div>
// 						</Marker>
// 					);
// 				}
// 				return (
// 				<Marker 
// 					key={cluster.properties.crimeId} 
// 					lat={latitude} 
// 					lng={longitude}>
						
// 					<BtnStyle>
// 						<button onClick= {() => {
// 								<div>HEJ</div>
// 							}}
// 							className="crime-marker">
// 							<img className = "scooter" src={scooter} alt="scooter"/>
// 						</button>
// 					</BtnStyle>
// 				</Marker>
// 				)
// 			})}
			
// 			</GoogleMapReact>
			
// 			):(<p>Loading...</p> )}
// 		</Style>	

// 	);
// }

