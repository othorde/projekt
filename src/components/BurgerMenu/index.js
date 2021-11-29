import React from 'react';
import { StyledBurger  } from './Form.styles.js';
import { bool, func } from 'prop-types';

const Burger = ({open, setOpen}) => {
	console.log(open)
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