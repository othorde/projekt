import {React, useContext} from "react"
import AppContext from "../../AppContext.js";
// components
//picture && styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset, faCreditCard, faHardHat } from '@fortawesome/free-solid-svg-icons'
import newBike from '../../images/newbike.jpg';

import { 
	Container,
	WelcomeMessage,
	IconWrapper,
	Icon1,
	Icon2,
	Icon3
} from "./Form.styles.js";

/* Efter inloggning hamnar man här. Som en startsida.
   gör egentligen ingenting.
   Visar lite ikoner från fontawesome
   och en bild
*/
export default function Home() {

    const myContext = useContext(AppContext);
	return (
		<Container>
			<WelcomeMessage> 
				<h2>Välkommen {myContext.userHook.value.user || myContext.local.user }</h2>
				<p> </p>
				<div className="container">
					<img src={newBike} alt="New bike" width="100%" height="100%" /> 
					<div className="middle">
						<div className="text">Vår nya cykel har 20% längre batteritid</div>
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
		</Container>
	);
}