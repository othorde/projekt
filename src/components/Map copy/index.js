import {React, useEffect, useState } from "react";
//googlemap
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
//components
import useCurrentLocation from "../../Hooks/currentPosition";
//styles
import {Style} from './Form.styles'


const options = {
	enableHighAccuracy: true,
	timeout: 1000 * 60 * 1, // 1 min
	maximumAge: 1000 * 60 * 60, // 1 hour
  };



// style annorlunda jmf med komponenter. Se form.styles,  
export function MapContainer ({google, onMarkerClick, onInfoWindowClose}){



	const { location, error } = useCurrentLocation(options);
	const { poly, setPoly } = useState("");

	
	const fetchPlaces = (mapProps, map)  => {

		const triangleCoords = [
			{lat: 25.774, lng: -80.190},
			{lat: 18.466, lng: -66.118},
			{lat: 32.321, lng: -64.757},
			{lat: 25.774, lng: -80.190}
		  ];
		console.log(mapProps, map);
		const service = new google.maps.places.PlacesService(triangleCoords);
		console.log("service,", service)
	}

	const mapClicked = (mapProps, map, clickEvent) => {
		console.log("MAPprops,", mapProps)
		console.log("map,", map)
		console.log("clickEvent,", clickEvent)

	}

	const onMarkerClicks = (props, marker, e) => {
		console.log("PROPS", props.name)
		console.log("PROPS", props.position)

		/* console.log("marker", marker)

		console.log("e", e) */

	}

	const onMouseoverMarker = (props, marker, e) => {
		console.log("PROPS onMouseoverMarker", props.name)
		console.log("PROPS onMouseoverMarker", props.position)

		/* console.log("marker", marker)

		console.log("e", e) */
	}

	useEffect(() => {
		console.log(poly)
		
	}, [poly])


	console.log(poly)

	return (
		<>
		{location ? (
		<Map 
			google={google}
			onReady={fetchPlaces}
			zoom={14}
			containerStyle={Style}
			initialCenter={{ // ändra beroende på vart användaren befinner sig
				lat: location.latitude,
				lng: location.longitude
			}}
			onClick={mapClicked}
		>
  		{/* <Polygon
          path={poly.triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2} /> */}

		<Marker onClick={onMarkerClicks}
			name={'Your position'}
			position={{lat: 59.3293, lng: 18.0686}}
		/>

		<Marker onClick={onMarkerClicks}
			name={'Current location'}
			onMouseover={onMouseoverMarker}
		/>

		<InfoWindow onClose={onInfoWindowClose}>
			<div>
			<h1> {/* this.state.selectedPlace.name */} </h1>
			</div>
		</InfoWindow>
		</Map>
		) : (
			<p>Loading...</p>
		  )}
	
	</>
	);
}



export default GoogleApiWrapper({
	
  	apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)

