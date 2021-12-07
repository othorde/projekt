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
import Api from '../../api';


let initalValue = {
	loadScooters: false,
	content: []
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

const Admin = () => {
	const [ifToShowScooter, setIfToShowScooter] = useState(initalValue);
	const [ifToShowCity, setIfToShowCity] = useState(initalValueLoadCitys);
	const [ifToShowLoadStations, setIfToShowLoadStations] = useState(initalValueLoadStations);
	const [ifToShowParkingZone, setIfToShowParkingZone] = useState(initalValueParkingZone);

	// hämtar ju alla scootrar här varje gång man trycker.
	// Kanske onödigt? Samtidigt vill man få det uppdaterat?

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
				content: res
			});
        } catch (error) {
			console.log(error)
        }
    }
	
	/* om vi ska ha knapp för cyklar */
	// const getScooters = async() => {
    //     try {
    //         let res = await Api.getAllScooters();  
	// 		setIfToShowScooter(prevState => ({
	// 			loadScooters: !prevState.loadScooters,
	// 			content: res
	// 		}));
			
    //     } catch (error) {
	// 		console.log(error)
    //     }
    // }

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

