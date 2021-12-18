import React from 'react';
import { StyledBurger  } from './Form.styles.js';
import { bool, func } from 'prop-types';

/* burgermeny, knapp med 3 streck/divs */
const Burger = ({open, setOpen}) => {
	return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
		<div />
		<div />
		<div />
    </StyledBurger>
  	)
}

Burger.propTypes = {
	open: bool.isRequired,
	setOpen: func.isRequired,
  };

export default Burger;