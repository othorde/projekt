import styled from "styled-components";





export const Container = styled.div `{
    min-height: 100vh;
    width: 100%; 
    margin 0 auto;
    display: flex;
    flex-direction: row;
	background-color: #8CF3F3;
	padding: 2em;
    padding-bottom: 8em;    /* Footer height */

	@media (max-width: 1000px) {
		flex-direction: column;
		width: 100%;
		height: 85%;
		padding-left: 1em;

	}
}
    
`;

export const Main = styled.div `{
	display: flex;
	flex-direction: row;
	width: "100%"};
	transition: all 1s;
    background-color: #8CF3F3;
    padding-right:2em;
	position: relative;
	display: inline-block;
	
	@media (max-width: 1000px) {
		flex-direction: row;
		width: 90%;
		height: 90%;
		padding-right:0em;
		padding-left:0em;

	}
}
`

export const StylePayment = styled.div `{
	
	
	@media (max-width: 600px) {
		margin:0;
		padding:0;
		position: absolute;
		height: 100%;
		max-height: 25em;
		width: 100%;
		min-width: 250px;
		background:#8CF3F3;
		border: 2px solid black;
		z-index: 1000;
		top: calc(${props => props.pageY}px + -100px );


	}
}
`

export const StyleHistory = styled.div `{
	
	
	@media (max-width: 600px) {
		.div {
			margin:0;
			padding:0;
			position: absolute;
			top: 100px;
			max-height: 25em;
			width: 100%;
			min-width: 250px;
			height: 100%;
			background:#8CF3F3;
			border: 2px solid black;
			z-index: 1000;
		}
		
	}
}
`

export const ForwardBackwards = styled.div `{
	
	display: flex;
	min-width: 220px;

	.back {
		margin-right:auto;
		:hover {
			color:#F47BA6;
		}

	}
	.forward {
		margin-left:auto;
		:hover {
			color:#F47BA6;
		}


	}
}
`
export const UserInfo = styled.div `

	background-color: #f9f9f9;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	padding: 12px 16px;
	z-index: 1;
    width: 100%;
    min-width: 250px;
	font-size: 0.9em;
	border-radius: 5px 5px 5px 5px;
	overflow: hidden;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
	background-color: #C6F4F4;


    button {
        background:#8CF3F3;
        border: 1px solid black;
        :hover {
            background:#1F2A32;
        }
        :active {
            color: white;
        }
    }
    button {
        display: inline-block;
        border-radius: 4px;
        text-align: center;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
		width: 90%;
		font-size: clamp(0.8rem, 1.1vw, 1rem);
      }
      
      button span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }
      
    button span:after {
        content: '»»';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.4s;
    }
      
    button:hover span {
        padding-right: 25px;

    }
      
    button:hover span:after {
        opacity: 1;
        right: 0;
    }
    button:hover, a.button:hover, button:hover, [type=submit]:hover, [type=reset]:hover, [type=button]:hover {
        border: 1px solid black;
        background: #333333;
        color: #ffffff;
        text-decoration: none;
    }

    .button:focus,  button:active{
        border: 1px solid black;
        background: black;
        color: #ffffff;
        text-decoration: none;
    }
	caption {
		font-weight: bold;
		text-align: left;
	}

	table {
		border: 1px solid #ccc;
		border-collapse: collapse;
		padding: 0;
		width: 100%;
		table-layout: fixed;
		min-width: 160px;

	}
	
	table caption {
		font-size: 1.5em;
		margin: .5em 0 .75em;
	}
	thead tr{
		color: #ffffff;
		text-aling: left;
		font-weight:bold;
		
	}
	th {
		background-color: #1f2a32;
	}
	
	table tr {
		background-color: #f8f8f8;
		border: 1px solid #ddd;
		padding: .35em;
	}
	
	table th,
	table td {
		padding: 12px 8px;
		text-align: center;
		font-size: 0.9em;
		word-wrap:break-word;
	}
	
	table th {
		font-size: .9em;
		letter-spacing: .1em;
		text-transform: uppercase;
	}

	tbody tr {
		border-bottom: 1px solid #1f2a32;
	}

    table tr:nth-child(even) {
        background: #ccc;
    }
	
	@media screen and (max-width: 1000px) {
		button {
			font-size: 1rem;
			width: 50%;	
			max-width: 10em;

		}
		table {
			border: 0;
		}
	
		table caption {
			font-size: 1.3em;
		}
		
		table thead {
			border: none;
			clip: rect(0 0 0 0);
			height: 1px;
			margin: -1px;
			overflow: hidden;
			padding: 0;
			position: absolute;
			width: 1px;
		}
		
		table tr {
			border-bottom: 3px solid #ddd;
			display: block;
			margin-bottom: .625em;
		}
		
		table td {
			border-bottom: 1px solid #ddd;
			display: block;
			font-size: .9em;
			text-align: right;
		}

		table td::before {
			content: attr(data-label);
			float: left;
			font-weight: bold;
			text-transform: uppercase;
		}
		
        table tr:nth-child(even) {
            background: #f8f8f8;
        }

		table td:last-child {
			border-bottom: 0;
		}
	}
	

`;