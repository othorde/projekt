import React, {useState , useEffect} from "react";
//components
import Map from '../Map/index'

//Styles
import {Wrapper, Content, Nav, MapContainer, StyledBtn} from './Form.styles'
import Api from '../../api'
/* link / navLinkto (to) prop använder invoice number för att ladda sidan med
  rätt id
*/

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

const Admin = () => {
	const [ifToShowScooter, setIfToShowScooter] = useState(initalValue);
	const [ifToShowCity, setIfToShowCity] = useState(initalValueLoadCitys);
	const [ifToShowLoadStations, setIfToShowLoadStations] = useState(initalValueLoadStations);

	// hämtar ju alla scootrar här varje gång man trycker.
	// Kanske onödigt? Samtidigt vill man få det uppdaterat?
	const getScooters = async() => {
        try {
            let res = await Api.getAllScooters();  
			setIfToShowScooter(prevState => ({
				loadScooters: !prevState.loadScooters,
				content: res
			}));
        } catch (error) {
			console.log(error)
        }
    }
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

return (
    <Wrapper>
        <Content>
			<Nav>
				<StyledBtn onClick= {getScooters}> Cyklar </StyledBtn>
				<StyledBtn onClick= {getCitys}> Städer </StyledBtn>
				<StyledBtn onClick= {getLoadStations}> Laddstationer </StyledBtn>
				<StyledBtn onClick= {null}> Accepterade platser </StyledBtn>
			</Nav>
			<MapContainer>
				<Map ifToShowScooter={ifToShowScooter} ifToShowCity={ifToShowCity} ifToShowLoadStations={ifToShowLoadStations} ></Map>
			</MapContainer>
        </Content>
    </Wrapper>
  )
}

export default Admin

