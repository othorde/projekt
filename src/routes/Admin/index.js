import React, {useState, useEffect} from "react";
//components
import Map from '../../components/Map/index';
//Styles
import {
	Container, 
	Nav, 
	MapContainer, 
	StyledBtn, 
} from './Form.styles';
//other
import Api from '../../Api';


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
		getScooters()
		const interval=setInterval(()=>{
			getScooters()
		 }, 10000)
		   
		 return()=>clearInterval(interval)
	},[])

	const getScooters = async() => {
        try {
            let res = await Api.getAllScooters();  
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

