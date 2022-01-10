import React, {useState, useEffect} from "react";
//components
import Map from '../../components/Map/index';
//Styles
import {
	Container, 
	Nav, 
	MapContainer, 
	StyledBtn,
	StyledImg
} from './Form.styles';
//other
import {getAllScooters} from '../../Api';
import fullyChargedBike from '../../images/fullyChargedBike.png';
import halfChargedBike from '../../images/halfchargedbike.png';
import noChargeBike from '../../images/noChargeBike.png';

let initalValue = {
	loadScooters: false,
	content: [],
	error: false
}
let initalValueLoadCitys = {
	loadCity: false,
}
let initalValueLoadStations = {
	loadStation: false,
}

let initalValueParkingZone = {
	loadParkingZone: false,
}

/* Admin hämtar scootrar var 10 sekund. Visar också tre knappar för om användaren vill se städer, 
	laddstationer eller parkingszoner på kartan */
const Admin = () => {
	const [ifToShowScooter, setIfToShowScooter] = useState(initalValue);
	const [ifToShowCity, setIfToShowCity] = useState(initalValueLoadCitys);
	const [ifToShowLoadStations, setIfToShowLoadStations] = useState(initalValueLoadStations);
	const [ifToShowParkingZone, setIfToShowParkingZone] = useState(initalValueParkingZone);

	// vid mount, anropa getScooters samt var 10 sekund
	useEffect(()=>{
		
		const getScooters = async() => {
			try {
				let res = await getAllScooters();  
				setIfToShowScooter({
					loadScooters: true,
					content: res,
					error: false
				});
			} catch (error) {
				setIfToShowScooter({
					loadScooters: true,
					content: [""],
					error: true
				})
			}
		}

		getScooters()
		const interval=setInterval(()=>{
			getScooters()
		 }, 10000)
		   
		return()=>{
			clearInterval(interval)
		}
	},[])

	/* Dessa tre funktionerna togglar state, vilket tar bort eller lägger till elementen på kartan */
	const getCitys = async() => {
		setIfToShowCity(prevState => ({
			loadCity: !prevState.loadCity,
		}));
	}

	const getLoadStations = async() => {
		setIfToShowLoadStations(prevState => ({
			loadStation: !prevState.loadStation,
		}));
	}

	const getParkingZone = async() => {
		setIfToShowParkingZone(prevState => ({
			loadParkingZone: !prevState.loadParkingZone,
		}));
	}

	/* skickar states till map, så map vet vad som ska visas */
	return (
		<Container>
			<Nav>
				<StyledBtn onClick= {getCitys}> Städer </StyledBtn>
				<StyledBtn onClick= {getLoadStations}> Laddstationer </StyledBtn>
				<StyledBtn onClick= {getParkingZone}>  Parkeringszoner </StyledBtn>
				<StyledImg>
					<img src={fullyChargedBike} alt="fully charged bike" width="60px" height="60px" />
					<p style={{fontWeight: "bold", fontSize: "0.9em"}}> BATTERI {'>'} 75% </p>
					<img src={halfChargedBike} alt="fully charged bike" width="60px" height="60px" />
					<p style={{fontWeight: "bold", fontSize: "0.9em"}}>BATTERI 25-75% </p>
					<img src={noChargeBike} alt="fully charged bike" width="60px" height="60px" />
					<p style={{fontWeight: "bold", fontSize: "0.9em"}}> BATTERI {'<'} 25%</p>
				</StyledImg>
			</Nav>
			<MapContainer>
				<Map 
					ifToShowScooter={ifToShowScooter}
					ifToShowCity={ifToShowCity} 
					ifToShowLoadStations={ifToShowLoadStations} 
					ifToShowParkingZone={ifToShowParkingZone} >
				</Map>
			</MapContainer>
		</Container>
	)
}

export default Admin

