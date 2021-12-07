import {React, useState, useEffect, useContext} from "react";
//components
import User from "../../components/User/index.js";
import Payment from "../../components/Payment/index.js";
//styles
import { Container, UserInfoContainer, PaymentContainer, Christmas } from "./Form.styles.js";
import christmas from "../../images/christmas.jpg"
//Other
import Api from "../../api.js";
import AppContext from "../../AppContext.js";


const Account = () => {

    const[userDetails, setUserDetails] = useState(null); 
	const myContext = useContext(AppContext);
	const user = myContext.userHook;

	// HÄR får du User id när inloggs är klar skicka med det
	// Lägg också till funktion för att kolla så att det finns en användar inloggad
    useEffect(() => {
        async function fetchData() {
			if(user && user.value.id) {
				let res = await Api.getAUser(user.value.id);
				setUserDetails(res);
			}
        }
        fetchData();
	},[user])


	return (
		<Container>
			<UserInfoContainer>
					<User userDetails={userDetails}> </User>
						<Christmas>
							<img src={christmas} alt="download google" width="100%" height="100%"/>
							<div class="middle">
								<div class="text">Håll utkik... snart börjar mellandagsrean! </div>
							</div>
						</Christmas>
				</UserInfoContainer>
			<PaymentContainer>
				<Payment userDetails={userDetails}></Payment>
			</PaymentContainer>	
		</Container>
	);
}

export default Account

