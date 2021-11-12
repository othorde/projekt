import React, {useState , useEffect} from "react";
//components
import Map from '../Map/index'

//Styles
import {Wrapper, Content, Nav, MapContainer} from './Form.styles'
import Api from '../../api'
/* link / navLinkto (to) prop använder invoice number för att ladda sidan med
  rätt id
*/

let initalValue = {
	getbike: false,
	content: []
}

const Admin = () => {
	const [bikes, setBike] = useState(initalValue);

	const getBikes = async ()  => {
        try {
            let res = await Api.getAllCrimes();
			setBike(prevState => ({
				getbike: !prevState.getbike,
				content: res
			  }));
        } catch (error) {
        }
    }

return (
    <Wrapper>
        <Content>
			<Nav>
			<button onClick= {getBikes} > Ladda cyklar </button>
			</Nav>
			
			<MapContainer>
				<Map bikes={bikes} ></Map>
			</MapContainer>
			
        </Content>
    </Wrapper>
  )
}

export default Admin

