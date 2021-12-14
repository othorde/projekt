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

/* Sidan account. Hämtar användaren från useContext, skickar vidare infon till komponenterna */
const Account = () => {

    const[userDetails, setUserDetails] = useState(null); // användaruppg
	const[userDetailsError, setUserDetailsError] = useState(null); //Om error
	const myContext = useContext(AppContext);
	const user = myContext.userHook;

	/* Hämtar användaruppg från servern (vid mount samt om usern ändras) */
    useEffect(() => {
        async function fetchData() {
			setUserDetailsError(false);
			if(user && user.value.id) {
				try {
					let res = await Api.getAUser(user.value.id);
					setUserDetails(res);
				} catch (error) {
					setUserDetailsError(true);
				}
			}
        }
        fetchData();
	},[user])

	return (
		<Container>
			{/* Sålänge det ej är error från hämtningen, visar upp infon */}
			{!userDetailsError ? 
			<>
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
			</>
			:<p> Något gick fel vid hämtningen från servern</p>}
		</Container>
	);
}

export default Account
