import React, { useContext } from "react";
import { bool } from 'prop-types';

// components
import AppContext from "../../AppContext";

// styles
import { StyledMenu } from './Form.styles';
import { Link, Outlet, useNavigate  } from "react-router-dom";



const Menu = ({ open }) => {

	const myContext = useContext(AppContext);
    const auth = myContext.auth;
    let admin = true; /* byt ut denna sen, checka om det är admin vid inlogg */
    let user = false; /* byt ut denna sen, checka om det är admin vid inlogg */

return (
    <StyledMenu open={open}>
		<Link to="/home" > Hem </Link> 
		{admin &&
			<>
			<Link to="/admin" > Admin </Link> 
			<Link to="/account" > Hantera kunder </Link>
			</>
		}
		{user &&
			<>
			<Link to="/account" > Konto </Link>
			<Link to="/history" > Historik </Link>
			</>
		}
		<Outlet/> {/* outlet renderar child  */}
    </StyledMenu>
  )
}
Menu.propTypes = {
  open: bool.isRequired,
}
export default Menu;