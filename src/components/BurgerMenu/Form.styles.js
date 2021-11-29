import styled from "styled-components";

export const StyledBurger = styled.button`
	position: absolute;
	top: 2rem;
	left: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 2rem;
	height: 2rem;
	background: #fff0f5;
	border: none;
	cursor: pointer;
	padding: 0;
	z-index: 1000;
	color: #fff0f5;
	border: #fff0f5;
	@media (min-width: 720px) {
		display: none;
	}

  &:focus {
    outline: none;
	background: #fff0f5;
	border: #fff0f5;
}

	:hover {
		border: #fff0f5;

	}

	div {
		width: 2rem;
		height: 0.25rem;
		background: black;
		border-radius: 10px;
		transition: all 0.3s linear;
		position: relative;
		transform-origin: 1px;

    :first-child {
     	transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
		opacity: ${({ open }) => open ? '0' : '1'};
		transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      	transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;