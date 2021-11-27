import {React, useContext} from "react"
import AppContext from "../../AppContext.js";
// components

//picture && styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset, faCreditCard, faHardHat } from '@fortawesome/free-solid-svg-icons'
import newBike from '../../images/newbike.jpg';

import { 
	Wrapper,
	Content,
	WelcomeMessage,
	IconWrapper,
	Icon1,
	Icon2,
	Icon3
} from "./Form.styles.js";


export default function Home() {
    // get user by username
    //
    const myContext = useContext(AppContext);
	return (
		<Wrapper>
            <Content>
	{/* 			<EnvironmentPic> <img src={environment} alt="environment" width="25%" height="80%" />  </EnvironmentPic> 
				<LoadAtHomePic> <img src={loadathome} alt="Load at home" width="80%" height="100%" /> </LoadAtHomePic> 
				 */}
					<WelcomeMessage> 
						<h2>Välkommen {myContext.user.username}</h2>
						<p>Uppdatera denna texten med något vettigt</p>
			
						<div class="container">
							<img src={newBike} alt="New bike" width="100%" height="100%" /> 
							<div class="middle">
								<div class="text">Pssst vår nya cykel har 20% längre batteritid</div>
							</div>
						</div>
						
					</WelcomeMessage>
					<IconWrapper>
						<Icon1> 
							<FontAwesomeIcon icon={faHardHat} size="2x" />  
							<h3>Var försiktig</h3>
							<p>Använd hjälm!</p>
						</Icon1> 
						<Icon2> 
							<FontAwesomeIcon icon={faCreditCard} size="2x" />
							<h3>Betalning</h3>
							<p>Betala enkelt snabbt och säkert</p>
						</Icon2>
						<Icon3> 
							<FontAwesomeIcon icon={faHeadset} size="2x" />
							<h3>Support</h3>
							<p>Vår support och felanmälan har öppet 24/7</p>
						</Icon3>
					</IconWrapper>
	
			</Content>
		</Wrapper>
	);
}