import {React, useEffect, useState, useRef } from "react";
//googlemap
//components
//styles
import {Style, BtnStyle} from './Form.styles'
import scooter from '../../images/bike.png'
import useSwr from "swr";
import Api from '../../api'

let res = Api.getAllCrimes()

// style annorlunda jmf med komponenter. Se form.styles,  
export default function BikeMarker(forMarker) {
	const mapRef = forMarker;
	const [zoom, setZoom] = useState(forMarker.zoom);
	const [bounds, setBounds] = useState(forMarker.bounds);
	const url = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2020-01"

	const fetcher = (...args) => fetch(...args).then(response => response.json()); //gör om denna sen

    const geter = async ()  => {
      try {
          let res = await Api.getAllCrimes()
          console.log(res)
      } catch (err) {
        console.log(err)
      }
  }
  
	const {data, error} = useSwr(url, fetcher) //gör om denna sen
	const crimes = res;

  console.log(res)

	//clusters
  const Marker = ({children}) => children;
  geter();

	return (
		<>
			{/* {crimes.map(crime => {
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
			})} */}
		</>	

	);
}


