import React from 'react';
import { StyledBurger  } from './Form.styles.js';

/* burgermeny, knapp med 3 streck/divs, tar
	props from header. Om den ska vara aktiv eller inte
*/
const BurgerMenu = ({open, setOpen}) => {
	return (
    <StyledBurger open={open} onClick={() => setOpen(!open)} data-testid="burgerButton">
		<div/>
		<div/>
		<div/>
    </StyledBurger>
  	)
}

export default BurgerMenu;