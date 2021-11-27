import {React, useContext} from "react";
//components
import User from "../../components/User/index.js";
import Payment from "../../components/Payment/index.js";
//styles
import { Container, UserInfoContainer, PaymentContainer, Christmas } from "./Form.styles.js";
import christmas from "../../images/christmas.jpg"

const Account = () => {

	return (
		<Container>
			<UserInfoContainer> 
					<User> </User>
						<Christmas>
						<img src={christmas} alt="download google" width="100%" height="100%"/>
							<div class="middle">
								<div class="text">Julrea! Du får 10% extra att köra för om du sätter in 500:- eller startar en prenumeration</div>
							</div>
						</Christmas>
				</UserInfoContainer>
			<PaymentContainer>
				<Payment></Payment>
			</PaymentContainer>	
		
		</Container>
	);
}

export default Account

