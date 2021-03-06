import {React, useEffect, useState, useRef } from "react";
//googlemap
import GoogleMapReact from "google-map-react";
//components

//styles & img
import {Style} from './Form.styles'
import person from '../../images/person.png'

export default function MapContainer({showMapForUser}) {

	const Marker = ({ children }) => <div>{children}</div>;
	const mapRef = useRef();
	const [coordinates, setCoordinates] = useState({start: {}, stop: {}})

	useEffect(() => {
		function setCoord () {
			setCoordinates({
				startLat: parseFloat(showMapForUser.startCoord[0]),
				startLng: parseFloat(showMapForUser.startCoord[1]),
				stopLat: parseFloat(showMapForUser.stopCoord[0]),
				stopLng: parseFloat(showMapForUser.stopCoord[1]),
			})
		}
		setCoord()
	}, [showMapForUser.stopCoord, showMapForUser.startCoord])


	function placePolyLine() {
		
		const polyCoordinates = [
		  { lat: coordinates.startLat, lng: coordinates.startLng },
		  { lat: coordinates.stopLat, lng: coordinates.stopLng },
		];

		const lineSymbol = {
		path: mapRef.current.maps.SymbolPath.FORWARD_CLOSED_ARROW,
		strokeColor: "#DC143C",
		scale: 4,
		  };
		const polyLine = new mapRef.current.maps.Polyline({
		  path: polyCoordinates,
		  icons:[{
			  	icon: lineSymbol,
				offset: "100%",
			}],
		  geodesic: true,
		  strokeColor: "black",
		  strokeOpacity: 1.0,
		  strokeWeight: 2,
		});
		polyLine.setMap(mapRef.current.map);
		animateCircle(polyLine);

	}


	function animateCircle(polyLine) {
		let count = 0;
	  
		window.setInterval(() => {
		  count = (count + 1) % 200;
		  const icons = polyLine.get("icons");
		  icons[0].offset = count / 2 + "%";
		  polyLine.set("icons", icons);
		}, 20);
	  }
	  

	return (
		<Style>
			{coordinates ? 
			<GoogleMapReact 
				bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
				center={{ 
					lat: coordinates.startLat, 
					lng: coordinates.startLng
				}}
				defaultZoom={15}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded= {({map, maps}) => {
					mapRef.current = {map, maps};
					placePolyLine();
				}}
			>
			<Marker
				key={1} 
				lat={coordinates.startLat}
				lng={coordinates.startLng}
			>
				<div >
					<img className = "crime-marker" src={person} alt="person" />
				</div>	
			</Marker>
			</GoogleMapReact>
			: null}
		</Style>
	);
}


